import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FormInput from '../components/FormInput'
import Button from '../components/Button'
import styles from '../styles/Login.module.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors = {}
    
    if (!email) {
      newErrors.email = 'E-mail é obrigatório'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'E-mail inválido'
    }
    
    if (!senha) {
      newErrors.senha = 'Senha é obrigatória'
    } else if (senha.length < 6) {
      newErrors.senha = 'Senha deve ter pelo menos 6 caracteres'
    }
    
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true)
      try {
        await login(email, senha)
        navigate('/')
      } catch (err) {
        setErrors({ geral: err.message || 'Erro ao realizar login. Tente novamente.' })
      } finally {
        setIsLoading(false)
      }
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <div className={styles.container}>
      <Header />
      
      <main className={styles.main}>
        <div className={styles.formWrapper}>
          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <Link to="/" className={styles.logoLink}>
                <img src="/imagens/salvando-a-terra-com-tecnologia-artificial 2.png" alt="Logo" className={styles.logo} />
              </Link>
              <h1>Bem-vindo de Volta</h1>
              <p>Faça login para acessar sua conta</p>
            </div>

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

              <FormInput
                label="Senha"
                type="password"
                id="senha"
                name="senha"
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                error={errors.senha}
                required
              />

              <div className={styles.forgotPassword}>
<Link to="/redefinir-senha">Esqueceu sua senha?</Link>
              </div>

              {errors.geral && (
                <p className={styles.errorGeral}>{errors.geral}</p>
              )}

              <Button 
                type="submit" 
                variant="primary" 
                size="large" 
                isFullWidth
                disabled={isLoading}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            <div className={styles.divider}>
              <span>Novo por aqui?</span>
            </div>

            <Link to="/cadastro" className={styles.signupLink}>
              <Button variant="secondary" size="large" isFullWidth>
                Criar Conta
              </Button>
            </Link>
          </div>

          <div className={styles.welcomeSection}>
            <div className={styles.welcomeContent}>
              <h2>Arborização Inteligente</h2>
              <p>Junte-se a milhares de pessoas contribuindo para cidades mais verdes e sustentáveis</p>
              <ul className={styles.featuresList}>
                <li>✓ Contribua com projetos de arborização</li>
                <li>✓ Acompanhe seu progresso e impacto</li>
                <li>✓ Conecte-se com a comunidade</li>
                <li>✓ Acesse ferramentas exclusivas</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
