import { useState, useEffect } from 'react';
import { obtenerPacientePorId } from '../api/pacienteService';
import { obtenerMedicamentos } from '../api/medicamentoService';
import { asignarMedicamento } from '../api/asignacionService';
import API from '../api/axiosConfig';

function calcularEdad(fechaNacimiento) {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad;
}

export default function PacienteDetalle({ pacienteId, onVolver }) {
  const [paciente, setPaciente] = useState(null);
  const [asignaciones, setAsignaciones] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAsignar, setShowAsignar] = useState(false);
  const [asigForm, setAsigForm] = useState({
    medicamentoId: '',
    dosis: '',
    frecuencia: '',
    fechaInicio: '',
  });
  const [toast, setToast] = useState(null);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const [pacRes, asigRes, medRes] = await Promise.all([
        obtenerPacientePorId(pacienteId),
        API.get(`/asignaciones/paciente/${pacienteId}`).catch(() => ({ data: [] })),
        obtenerMedicamentos(),
      ]);
      setPaciente(pacRes.data);
      setAsignaciones(asigRes.data || []);
      setMedicamentos(medRes.data);
    } catch (err) {
      console.error('Error cargando detalle:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, [pacienteId]);

  const handleAsignar = async (e) => {
    e.preventDefault();
    try {
      await asignarMedicamento({
        pacienteId: pacienteId,
        medicamentoId: parseInt(asigForm.medicamentoId),
        dosis: asigForm.dosis,
        frecuencia: asigForm.frecuencia,
        fechaInicio: asigForm.fechaInicio,
      });
      setToast({ type: 'success', msg: 'Medicamento asignado correctamente' });
      setShowAsignar(false);
      setAsigForm({ medicamentoId: '', dosis: '', frecuencia: '', fechaInicio: '' });
      cargarDatos();
    } catch (err) {
      console.error('Error asignando medicamento:', err);
      setToast({ type: 'error', msg: 'Error al asignar medicamento' });
    }
    setTimeout(() => setToast(null), 3000);
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!paciente) {
    return <div className="empty-state"><p>Paciente no encontrado</p></div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="detail-header">
        <button className="detail-back" onClick={onVolver} id="btn-volver" title="Volver">
          ←
        </button>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>
            {paciente.nombre} {paciente.apellido}
          </h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--gray-500)' }}>
            Detalle del paciente
          </span>
        </div>
      </div>

      {/* Info del paciente */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <h2>📋 Información Personal</h2>
        </div>
        <div className="card-body">
          <div className="detail-info-grid">
            <div className="detail-info-item">
              <span className="detail-info-label">Nombre completo</span>
              <span className="detail-info-value">{paciente.nombre} {paciente.apellido}</span>
            </div>
            <div className="detail-info-item">
              <span className="detail-info-label">Edad</span>
              <span className="detail-info-value">{calcularEdad(paciente.fechaNacimiento)} años</span>
            </div>
            <div className="detail-info-item">
              <span className="detail-info-label">Fecha de Nacimiento</span>
              <span className="detail-info-value">
                {new Date(paciente.fechaNacimiento + 'T00:00:00').toLocaleDateString('es-CO')}
              </span>
            </div>
            <div className="detail-info-item">
              <span className="detail-info-label">Género</span>
              <span className="detail-info-value">{paciente.genero}</span>
            </div>
            <div className="detail-info-item">
              <span className="detail-info-label">Diagnóstico Principal</span>
              <span className="detail-info-value">
                {paciente.diagnosticoPrincipal || '—'}
              </span>
            </div>
            <div className="detail-info-item">
              <span className="detail-info-label">Alergias</span>
              <span className="detail-info-value">
                {paciente.alergias && paciente.alergias.length > 0 ? (
                  <span className="allergy-tags" style={{ marginTop: 0 }}>
                    {paciente.alergias.map((a, i) => (
                      <span key={i} className="allergy-tag" style={{ cursor: 'default' }}>
                        ⚠️ {a}
                      </span>
                    ))}
                  </span>
                ) : '—'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Medicamentos asignados */}
      <div className="card">
        <div className="card-header">
          <h2>💊 Medicamentos Asignados</h2>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setShowAsignar(!showAsignar)}
            id="btn-asignar-medicamento"
          >
            {showAsignar ? 'Cancelar' : '+ Asignar Medicamento'}
          </button>
        </div>
        <div className="card-body">
          {/* Formulario de asignación */}
          {showAsignar && (
            <form onSubmit={handleAsignar} style={{ marginBottom: '24px', padding: '20px', background: 'var(--gray-50)', borderRadius: 'var(--radius-md)' }}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="medicamentoId">
                    Medicamento <span className="required">*</span>
                  </label>
                  <select
                    id="medicamentoId"
                    className="form-select"
                    value={asigForm.medicamentoId}
                    onChange={(e) => setAsigForm(prev => ({ ...prev, medicamentoId: e.target.value }))}
                    required
                  >
                    <option value="">Seleccionar medicamento...</option>
                    {medicamentos.map((m) => (
                      <option key={m.id} value={m.id}>{m.nombre} — {m.fabricante}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="dosis">
                    Dosis <span className="required">*</span>
                  </label>
                  <input
                    id="dosis"
                    type="text"
                    className="form-input"
                    placeholder="Ej: 500mg"
                    value={asigForm.dosis}
                    onChange={(e) => setAsigForm(prev => ({ ...prev, dosis: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="frecuencia">
                    Frecuencia <span className="required">*</span>
                  </label>
                  <input
                    id="frecuencia"
                    type="text"
                    className="form-input"
                    placeholder="Ej: Cada 8 horas"
                    value={asigForm.frecuencia}
                    onChange={(e) => setAsigForm(prev => ({ ...prev, frecuencia: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="fechaInicio">
                    Fecha de Inicio <span className="required">*</span>
                  </label>
                  <input
                    id="fechaInicio"
                    type="date"
                    className="form-input"
                    value={asigForm.fechaInicio}
                    onChange={(e) => setAsigForm(prev => ({ ...prev, fechaInicio: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn btn-success btn-sm" id="submit-asignacion">
                  ✓ Asignar
                </button>
              </div>
            </form>
          )}

          {/* Tabla de medicamentos */}
          {asignaciones.length === 0 ? (
            <div className="empty-state" style={{ padding: '32px' }}>
              <div className="empty-state-icon">💊</div>
              <p className="empty-state-text">Sin medicamentos asignados</p>
              <p className="empty-state-sub">Asigna un medicamento usando el botón de arriba</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Medicamento</th>
                    <th>Dosis</th>
                    <th>Frecuencia</th>
                    <th>Fecha Inicio</th>
                  </tr>
                </thead>
                <tbody>
                  {asignaciones.map((a, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 500 }}>{a.medicamentoNombre}</td>
                      <td>{a.dosis}</td>
                      <td>{a.frecuencia}</td>
                      <td>{new Date(a.fechaInicio + 'T00:00:00').toLocaleDateString('es-CO')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`toast ${toast.type}`}>{toast.msg}</div>
      )}
    </div>
  );
}
