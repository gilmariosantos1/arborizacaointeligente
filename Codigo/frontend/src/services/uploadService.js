import { api } from '../api/api'

export const uploadService = {
  enviarRelato: ({ assunto, endereco, localizacao, descricao, imagem }) => {
    const formData = new FormData()
    formData.append('assunto', assunto)
    formData.append('endereco', endereco || '')
    formData.append('localizacao', localizacao)
    formData.append('descricao', descricao)
    if (imagem) formData.append('imagem', imagem)
    return api.post('/relatos', formData)
  },

  listarRelatos: () => api.get('/relatos'),
}
