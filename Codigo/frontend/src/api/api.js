const BASE_URL = '/api'

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token')
  const headers = { ...options.headers }

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Erro na requisição')
  }

  return data
}

export const api = {
  get: (endpoint) =>
    request(endpoint, { method: 'GET' }),

  post: (endpoint, body) =>
    request(endpoint, {
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),

  put: (endpoint, body) =>
    request(endpoint, {
      method: 'PUT',
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),

  delete: (endpoint) =>
    request(endpoint, { method: 'DELETE' }),
}
