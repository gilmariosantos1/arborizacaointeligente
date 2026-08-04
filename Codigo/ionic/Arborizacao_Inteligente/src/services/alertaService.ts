import api from './api';

export const createAlerta = (formData: FormData) =>
  api.post('/alertas', formData);

export const listAlertas = () => api.get('/alertas');
