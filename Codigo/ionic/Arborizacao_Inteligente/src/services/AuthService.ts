import api from './api';

export const login = async (email: string, senha: string) => {
  try {
    const { data } = await api.post('/users/login', { email, senha });

    if (data.token) {
      localStorage.setItem('token', data.token);
      const loggedUser = data.user || data.usuario;
      if (loggedUser) {
        localStorage.setItem('usuario', JSON.stringify(loggedUser));
      }
    }

    return data;
  } catch (error: any) {
    const message = error.response?.data?.erro || error.response?.data?.message || 'Erro ao fazer login';
    throw new Error(message);
  }
};
