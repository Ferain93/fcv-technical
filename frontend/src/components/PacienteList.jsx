import { useState, useEffect } from 'react';
import { obtenerPacientes, buscarPorDiagnostico } from '../api/pacienteService';

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

function getIniciales(nombre, apellido) {
  return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
}

export default function PacienteList({ onVerDetalle }) {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');

  const cargarPacientes = async () => {
    setLoading(true);
    try {
      let res;
      if (busqueda.trim()) {
        res = await buscarPorDiagnostico(busqueda.trim());
      } else {
        res = await obtenerPacientes();
      }
      setPacientes(res.data);
    } catch (err) {
      console.error('Error cargando pacientes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarPacientes();
  }, []);

  const handleBuscar = (e) => {
    e.preventDefault();
    cargarPacientes();
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="section-title">
        <h2>Pacientes Registrados</h2>
      </div>

      {/* Barra de búsqueda */}
      <form onSubmit={handleBuscar} style={{ marginBottom: '24px', display: 'flex', gap: '8px' }}>
        <input
          type="text"
          className="form-input"
          placeholder="Buscar por diagnóstico..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ maxWidth: '360px' }}
          id="search-diagnosis"
        />
        <button type="submit" className="btn btn-primary btn-sm">Buscar</button>
        {busqueda && (
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => { setBusqueda(''); setTimeout(cargarPacientes, 0); }}
          >
            Limpiar
          </button>
        )}
      </form>

      {pacientes.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🏥</div>
          <p className="empty-state-text">No se encontraron pacientes</p>
          <p className="empty-state-sub">
            {busqueda ? 'Intenta con otro diagnóstico' : 'Registra el primer paciente'}
          </p>
        </div>
      ) : (
        <div className="patient-grid">
          {pacientes.map((p) => (
            <div key={p.id} className="patient-card">
              <div className="patient-card-top">
                <div className="patient-avatar">
                  {getIniciales(p.nombre, p.apellido)}
                </div>
                <div>
                  <div className="patient-name">{p.nombre} {p.apellido}</div>
                  <div className="patient-age">{calcularEdad(p.fechaNacimiento)} años</div>
                </div>
              </div>

              <div className={`patient-diagnosis ${!p.diagnosticoPrincipal ? 'no-diagnosis' : ''}`}>
                <span>🩺</span>
                {p.diagnosticoPrincipal || 'Sin diagnóstico'}
              </div>

              <div className="patient-card-actions">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => onVerDetalle(p.id)}
                  id={`ver-detalle-${p.id}`}
                >
                  Ver detalles →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
