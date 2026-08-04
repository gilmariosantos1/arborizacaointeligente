import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FormInput from '../components/FormInput'
import Button from '../components/Button'
import api from '../services/api'
import styles from '../styles/RedefinirSenha.module.css'

export default function RedefinirSenha() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const tokenFromUrl = queryParams.get('token') || ''

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(tokenFromUrl ? 'nova-senha' : 'email')

  useEffect(() => {
    setStep(tokenFromUrl ? 'nova-senha' : 'email')
  }, [tokenFromUrl])

  const validateEmail = () => {
    const err = {}

    if (!email.trim()) {
      err.email = 'E-mail é obrigatório'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      err.email = 'E-mail inválido'
    }

    return err
  }

  const validateReset = () => {
    const err = {}

    if (!senha) {
      err.senha = 'A nova senha é obrigatória'
    } else if (senha.length < 6) {
      err.senha = 'A senha deve ter pelo menos 6 caracteres'
    }

    if (!confirmarSenha) {
      err.confirmarSenha = 'Confirme a nova senha'
    } else if (confirmarSenha !== senha) {
      err.confirmarSenha = 'As senhas não coincidem'
    }

    return err
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    setMessage('')

    if (step === 'email') {
      const err = validateEmail()
      setErrors(err)

      if (Object.keys(err).length > 0) {
        return
      }

      setIsLoading(true)

      try {
        const response = await api.post('/users/forgot-password', { email: email.trim() })
        setMessage(response.data.message || 'Instruções enviadas com sucesso.')
        if (response.data.resetLink) {
          setMessage((prev) => `${prev}\nLink de teste: ${response.data.resetLink}`)
        }
      } catch (error) {
        setMessage(error.response?.data?.erro || 'Não foi possível solicitar a redefinição de senha.')
      } finally {
        setIsLoading(false)
      }

      return
    }

    const err = validateReset()
    setErrors(err)

    if (Object.keys(err).length > 0) {
      return
    }

    setIsLoading(true)

    try {
      const response = await api.post('/users/reset-password', { token: tokenFromUrl, senha })
      setMessage(response.data.message || 'Senha redefinida com sucesso.')
    } catch (error) {
      setMessage(error.response?.data?.erro || 'Não foi possível redefinir a senha.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.card}>
          <h1>Redefinição de Senha</h1>
          <p>
            {step === 'email'
              ? 'Informe o e-mail da sua conta para receber o link de recuperação.'
              : 'Escolha uma nova senha para concluir a recuperação.'}
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            {step === 'email' ? (
              <FormInput
                label="E-mail"
                type="email"
                id="email"
                name="email"
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                required
              />
            ) : (
              <>
                <FormInput
                  label="Nova senha"
                  type="password"
                  id="senha"
                  name="senha"
                  placeholder="Digite sua nova senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  error={errors.senha}
                  required
                />

                <FormInput
                  label="Confirmar senha"
                  type="password"
                  id="confirmarSenha"
                  name="confirmarSenha"
                  placeholder="Confirme sua nova senha"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  error={errors.confirmarSenha}
                  required
                />
              </>
            )}

            <Button type="submit" variant="primary" size="large" isFullWidth disabled={isLoading}>
              {isLoading ? 'Enviando...' : step === 'email' ? 'Enviar instruções' : 'Redefinir senha'}
            </Button>
          </form>

          {message && <div className={styles.success}>{message}</div>}

          <div className={styles.backLink}>
            <Link to="/login">Voltar ao login</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
