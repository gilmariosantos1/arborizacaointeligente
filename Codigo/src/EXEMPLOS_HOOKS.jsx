/**
 * Exemplos de Uso dos Hooks Customizados
 * Este arquivo demonstra como usar os hooks customizados do projeto
 */

import { useForm, useMenuMobile, usePageTitle } from './hooks/useCustom'

// ============================================
// Exemplo 1: useForm com Validação
// ============================================

function ExemploFormulario() {
  const { values, handleChange, handleSubmit, reset } = useForm(
    { email: '', senha: '' },
    (formData) => {
      console.log('Dados enviados:', formData)
      // Enviar para API
    }
  )

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="password"
        name="senha"
        value={values.senha}
        onChange={handleChange}
        placeholder="Senha"
      />
      <button type="submit">Enviar</button>
      <button type="button" onClick={reset}>Limpar</button>
    </form>
  )
}

// ============================================
// Exemplo 2: useMenuMobile
// ============================================

function ExemploMenu() {
  const { isOpen, toggle, close } = useMenuMobile()

  return (
    <>
      <button onClick={toggle}>Menu</button>
      {isOpen && (
        <nav onClick={close}>
          <a href="/">Inicio</a>
          <a href="/login">Login</a>
        </nav>
      )}
    </>
  )
}

// ============================================
// Exemplo 3: usePageTitle
// ============================================

function ExemploTitulo() {
  usePageTitle('Minha Página - Arborização Inteligente')

  return <h1>Conteúdo da Página</h1>
}

// ============================================
// Exemplo 4: Componente com Múltiplos Hooks
// ============================================

import { useState } from 'react'

function ComponenteCompleto() {
  const { values, handleChange, handleSubmit } = useForm(
    { nome: '', email: '' },
    handleFormSubmit
  )
  
  const { isOpen, toggle } = useMenuMobile()
  usePageTitle('Página Completa')

  const [loading, setLoading] = useState(false)

  function handleFormSubmit(data) {
    setLoading(true)
    // Simular request
    setTimeout(() => {
      console.log('Enviado:', data)
      setLoading(false)
    }, 2000)
  }

  return (
    <div>
      <button onClick={toggle}>Menu: {isOpen ? 'Aberto' : 'Fechado'}</button>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          value={values.nome}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  )
}

export { ExemploFormulario, ExemploMenu, ExemploTitulo, ComponenteCompleto }
