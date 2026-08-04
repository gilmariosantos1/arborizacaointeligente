import api from './api';

export const createUser = (data: Record<string, unknown>) => api.post('/users/cadastro', data);
export const loginUser = (data: Record<string, unknown>) => api.post('/users/login', data);
