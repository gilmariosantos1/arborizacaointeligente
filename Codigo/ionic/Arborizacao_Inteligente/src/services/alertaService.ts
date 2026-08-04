import api from './api';

export const createAlerta = (formData: FormData) =>
  api.post('/alertas', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const listAlertas = () => api.get('/alertas');
