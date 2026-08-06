import api from "./api.js";

export const contato = (data: Record<string, unknown>) => api.post('/contatos', data);