import API from './axiosConfig';

export const obtenerPacientes = () => API.get('/pacientes');

export const obtenerPacientePorId = (id) => API.get(`/pacientes/${id}`);

export const buscarPorDiagnostico = (diagnostico) =>
  API.get('/pacientes/buscar', { params: { diagnostico } });

export const crearPaciente = (paciente) => API.post('/pacientes', paciente);
