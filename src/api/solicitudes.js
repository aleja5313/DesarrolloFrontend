import axios from 'axios';
const API = 'http://localhost:4000';

export const loginApi = (data) => axios.post(`${API}/login`, data).then(r => r.data);
export const getSolicitudes = (filters = {}) => axios.get(`${API}/solicitudes`, { params: filters }).then(r => r.data);
export const createSolicitud = (data) => axios.post(`${API}/solicitudes`, data).then(r => r.data);
export const updateSolicitud = (id, data) => axios.put(`${API}/solicitudes/${id}`, data).then(r => r.data);
export const getEstadisticas = () => axios.get(`${API}/estadisticas`).then(r => r.data);
