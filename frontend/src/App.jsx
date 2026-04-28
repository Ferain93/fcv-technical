import { useState } from 'react';
import PacienteList from './components/PacienteList';
import PacienteForm from './components/PacienteForm';
import PacienteDetalle from './components/PacienteDetalle';
import './App.css';

export default function App() {
  const [vista, setVista] = useState('lista'); // 'lista' | 'registrar' | 'detalle'
  const [pacienteIdSeleccionado, setPacienteIdSeleccionado] = useState(null);
  const [toast, setToast] = useState(null);

  const mostrarToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const handleVerDetalle = (id) => {
    setPacienteIdSeleccionado(id);
    setVista('detalle');
  };

  const handlePacienteCreado = () => {
    mostrarToast('success', '¡Paciente registrado exitosamente!');
    setVista('lista');
  };

  return (
    <>
      {/* Header */}
      <header className="app-header">
        <div className="app-container">
          <div className="header-brand">
            <div className="header-logo">🏥</div>
            <div>
              <div className="header-title">FCV</div>
              <div className="header-subtitle">Sistema de Gestión de Pacientes</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-container" style={{ paddingBottom: '48px' }}>
        {vista !== 'detalle' && (
          <nav className="nav-tabs" id="main-navigation">
            <button
              className={`nav-tab ${vista === 'lista' ? 'active' : ''}`}
              onClick={() => setVista('lista')}
              id="tab-lista"
            >
              📋 Pacientes
            </button>
            <button
              className={`nav-tab ${vista === 'registrar' ? 'active' : ''}`}
              onClick={() => setVista('registrar')}
              id="tab-registrar"
            >
              ➕ Registrar Paciente
            </button>
          </nav>
        )}

        {vista === 'lista' && (
          <PacienteList onVerDetalle={handleVerDetalle} />
        )}

        {vista === 'registrar' && (
          <PacienteForm onPacienteCreado={handlePacienteCreado} />
        )}

        {vista === 'detalle' && pacienteIdSeleccionado && (
          <PacienteDetalle
            pacienteId={pacienteIdSeleccionado}
            onVolver={() => setVista('lista')}
          />
        )}
      </main>

      {/* Toast global */}
      {toast && (
        <div className={`toast ${toast.type}`}>{toast.msg}</div>
      )}
    </>
  );
}
