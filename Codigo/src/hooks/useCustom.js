// Hooks customizados do projeto

import { useState, useEffect } from 'react'

/**
 * Hook para gerenciar formulários
 * @param {Object} initialValues - Valores iniciais do formulário
 * @returns {Object} - { values, handleChange, handleSubmit, reset }
 */
export const useForm = (initialValues, onSubmit) => {
  const [values, setValues] = useState(initialValues)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(values)
  }

  const reset = () => {
    setValues(initialValues)
  }

  return { values, handleChange, handleSubmit, reset, setValues }
}

/**
 * Hook para gerenciar menu mobile
 * @returns {Object} - { isOpen, toggle, close }
 */
export const useMenuMobile = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)
  const close = () => setIsOpen(false)

  return { isOpen, toggle, close }
}

/**
 * Hook para atualizar título da página
 * @param {string} title - Título da página
 */
export const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title
  }, [title])
}
