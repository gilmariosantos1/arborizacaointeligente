import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FormInput from '../components/FormInput'
import Button from '../components/Button'
import styles from '../styles/RedefinirSenha.module.css'

export default function RedefinirSenha() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const validate = () => {
    const err = {}
    if (!email) {
      err.email = 'E-mail é obrigatório'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      err.email = 'E-mail inválido'
    }
    return err
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const err = validate()
    setErrors(err)

    if (Object.keys(err).length === 0) {
      setIsLoading(true)
      setMessage('')
      setTimeout(() => {
        setIsLoading(false)
        setMessage(`Enviamos instruções para ${email}. Verifique seu e-mail.`)
      }, 1200)
    }
  }

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.card}>
          <h1>Redefinição de Senha</h1>
          <p>Informe o e-mail da sua conta para receber o link de recuperação.</p>

          <form onSubmit={handleSubmit} className={styles.form}>
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

            <Button type="submit" variant="primary" size="large" isFullWidth disabled={isLoading}>
              {isLoading ? 'Enviando...' : 'Enviar instruções'}
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
