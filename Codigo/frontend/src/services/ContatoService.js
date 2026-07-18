import api from "./api.js";

export const contato = (data) => api.post('/contatos', data);