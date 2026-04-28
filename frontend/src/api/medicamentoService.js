import API from './axiosConfig';

export const obtenerMedicamentos = () => API.get('/medicamentos');

export const crearMedicamento = (medicamento) => API.post('/medicamentos', medicamento);
