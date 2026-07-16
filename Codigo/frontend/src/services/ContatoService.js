import api from "./api.js";

export const contato = (data) => api.post('/contato', data);