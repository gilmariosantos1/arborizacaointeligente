import { api } from '../api/api'

export const userService = {
  getPerfil: () => api.get('/users/me'),

  atualizarPerfil: (dados) => api.put('/users/me', dados),
}
