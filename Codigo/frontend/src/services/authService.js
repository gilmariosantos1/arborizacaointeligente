import { api } from '../api/api'

export const authService = {
  login: (email, senha) =>
    api.post('/auth/login', { email, senha }),

  cadastro: (dados) =>
    api.post('/auth/cadastro', dados),

  redefinirSenha: (email) =>
    api.post('/auth/redefinir-senha', { email }),
}
