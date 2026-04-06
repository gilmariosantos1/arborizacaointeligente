import api from './api';

export const createUser = (data) => api.post('/cadastro', data);
export const loginUser = (data) => api.get('/login', data);