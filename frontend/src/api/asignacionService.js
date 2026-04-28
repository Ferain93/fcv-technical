import API from './axiosConfig';

export const asignarMedicamento = (asignacion) => API.post('/asignaciones', asignacion);
