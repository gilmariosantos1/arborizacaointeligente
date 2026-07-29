import api from './api';

export const createAlerta = (formData) =>
  // Deixe o navegador/axios definir o Content-Type com boundary automaticamente
  api.post('/alertas', formData);

export const listAlertas = () => api.get('/alertas');