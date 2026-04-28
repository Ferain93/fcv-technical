import { useState } from 'react';
import { crearPaciente } from '../api/pacienteService';

const INITIAL_FORM = {
  nombre: '',
  apellido: '',
  fechaNacimiento: '',
  genero: '',
  diagnosticoPrincipal: '',
};

export default function PacienteForm({ onPacienteCreado }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [alergias, setAlergias] = useState([]);
  const [alergiaInput, setAlergiaInput] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const agregarAlergia = () => {
    const alergia = alergiaInput.trim();
    if (alergia && !alergias.includes(alergia)) {
      setAlergias((prev) => [...prev, alergia]);
      setAlergiaInput('');
    }
  };

  const quitarAlergia = (index) => {
    setAlergias((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAlergiaKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      agregarAlergia();
    }
  };

  const validar = () => {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!form.apellido.trim()) newErrors.apellido = 'El apellido es obligatorio';
    if (!form.fechaNacimiento) newErrors.fechaNacimiento = 'La fecha de nacimiento es obligatoria';
    if (!form.genero) newErrors.genero = 'El género es obligatorio';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validar()) return;

    setLoading(true);
    try {
      const payload = {
        ...form,
        alergias: alergias.length > 0 ? alergias : null,
        diagnosticoPrincipal: form.diagnosticoPrincipal.trim() || null,
      };
      await crearPaciente(payload);
      setForm(INITIAL_FORM);
      setAlergias([]);
      setErrors({});
      onPacienteCreado();
    } catch (err) {
      console.error('Error creando paciente:', err);
      if (err.response?.data?.details) {
        setErrors(err.response.data.details);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>📋 Registrar Nuevo Paciente</h2>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit} id="patient-form">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="nombre">
                Nombre <span className="required">*</span>
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                className={`form-input ${errors.nombre ? 'error' : ''}`}
                placeholder="Ej: Juan"
                value={form.nombre}
                onChange={handleChange}
              />
              {errors.nombre && <p className="form-error">{errors.nombre}</p>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="apellido">
                Apellido <span className="required">*</span>
              </label>
              <input
                id="apellido"
                name="apellido"
                type="text"
                className={`form-input ${errors.apellido ? 'error' : ''}`}
                placeholder="Ej: Pérez"
                value={form.apellido}
                onChange={handleChange}
              />
              {errors.apellido && <p className="form-error">{errors.apellido}</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="fechaNacimiento">
                Fecha de Nacimiento <span className="required">*</span>
              </label>
              <input
                id="fechaNacimiento"
                name="fechaNacimiento"
                type="date"
                className={`form-input ${errors.fechaNacimiento ? 'error' : ''}`}
                value={form.fechaNacimiento}
                onChange={handleChange}
              />
              {errors.fechaNacimiento && <p className="form-error">{errors.fechaNacimiento}</p>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="genero">
                Género <span className="required">*</span>
              </label>
              <select
                id="genero"
                name="genero"
                className={`form-select ${errors.genero ? 'error' : ''}`}
                value={form.genero}
                onChange={handleChange}
              >
                <option value="">Seleccionar...</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
              {errors.genero && <p className="form-error">{errors.genero}</p>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="diagnosticoPrincipal">
              Diagnóstico Principal
            </label>
            <input
              id="diagnosticoPrincipal"
              name="diagnosticoPrincipal"
              type="text"
              className="form-input"
              placeholder="Ej: Diabetes tipo 2 (opcional)"
              value={form.diagnosticoPrincipal}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Alergias</label>
            <div className="allergy-input-row">
              <input
                type="text"
                className="form-input"
                placeholder="Agregar alergia y presionar Enter..."
                value={alergiaInput}
                onChange={(e) => setAlergiaInput(e.target.value)}
                onKeyDown={handleAlergiaKeyDown}
                id="alergia-input"
              />
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={agregarAlergia}
              >
                + Agregar
              </button>
            </div>
            {alergias.length > 0 && (
              <div className="allergy-tags">
                {alergias.map((a, i) => (
                  <span key={i} className="allergy-tag">
                    ⚠️ {a}
                    <button type="button" onClick={() => quitarAlergia(i)}>×</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => { setForm(INITIAL_FORM); setAlergias([]); setErrors({}); }}
            >
              Limpiar
            </button>
            <button
              type="submit"
              className="btn btn-success"
              disabled={loading}
              id="submit-patient"
            >
              {loading ? 'Guardando...' : '✓ Registrar Paciente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
