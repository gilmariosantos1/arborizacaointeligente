import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FormInput from '../components/FormInput'
import Button from '../components/Button'
import styles from '../styles/Cadastro.module.css'

export default function Cadastro() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    dataaNascimento: '',
    cep: '',
    estado: '',
    cidade: '',
    senha: '',
    confirmaSenha: '',
    termo: false
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório'
    }

    if (!formData.email) {
      newErrors.email = 'E-mail é obrigatório'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido'
    }

    if (!formData.cpf) {
      newErrors.cpf = 'CPF é obrigatório'
    }

    if (!formData.dataaNascimento) {
      newErrors.dataaNascimento = 'Data de nascimento é obrigatória'
    }

    if (!formData.cep) {
      newErrors.cep = 'CEP é obrigatório'
    }

    if (!formData.estado) {
      newErrors.estado = 'Estado é obrigatório'
    }

    if (!formData.cidade) {
      newErrors.cidade = 'Cidade é obrigatória'
    }

    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória'
    } else if (formData.senha.length < 6) {
      newErrors.senha = 'Senha deve ter pelo menos 6 caracteres'
    }

    if (formData.senha !== formData.confirmaSenha) {
      newErrors.confirmaSenha = 'As senhas não correspondem'
    }

    if (!formData.termo) {
      newErrors.termo = 'Você deve aceitar os termos'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true)
      // Simular envio de dados
      setTimeout(() => {
        console.log('Cadastro:', formData)
        setIsLoading(false)
        alert('Cadastro realizado com sucesso!')
        setFormData({
          nome: '',
          email: '',
          cpf: '',
          dataaNascimento: '',
          cep: '',
          estado: '',
          cidade: '',
          senha: '',
          confirmaSenha: '',
          termo: false
        })
      }, 1000)
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <div className={styles.container}>
      <Header />
      
      <main className={styles.main}>
        <div className={styles.formWrapper}>
          <div className={styles.welcomeSection}>
            <div className={styles.welcomeContent}>
              <Link to="/" className={styles.logoLink}>
                <img src="/imagens/3442850 3.png" alt="Logo" className={styles.logo} />
              </Link>
              <h2>Junte-se a Nós</h2>
              <p>Comece sua jornada contribuindo para cidades mais verdes</p>
              <ul className={styles.featuresList}>
                <li>✓ Acesso a projetos de arborização</li>
                <li>✓ Dashboard personalizado</li>
                <li>✓ Comunidade engajada</li>
                <li>✓ Impacto mensurável</li>
              </ul>
            </div>
          </div>

          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <h1>Criar Conta</h1>
              <p>Preencha todos os campos para se cadastrar</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.twoColumnGrid}>
                <FormInput
                  label="Nome Completo"
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Seu nome completo"
                  value={formData.nome}
                  onChange={handleChange}
                  error={errors.nome}
                  required
                />

                <FormInput
                  label="E-mail"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="seu.email@exemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                />

                <FormInput
                  label="CPF"
                  type="text"
                  id="cpf"
                  name="cpf"
                  placeholder="000.000.000-00"
                  value={formData.cpf}
                  onChange={handleChange}
                  error={errors.cpf}
                  required
                />

                <FormInput
                  label="Data de Nascimento"
                  type="date"
                  id="dataaNascimento"
                  name="dataaNascimento"
                  value={formData.dataaNascimento}
                  onChange={handleChange}
                  error={errors.dataaNascimento}
                  required
                />

                <FormInput
                  label="CEP"
                  type="text"
                  id="cep"
                  name="cep"
                  placeholder="00000-000"
                  value={formData.cep}
                  onChange={handleChange}
                  error={errors.cep}
                  required
                />

                <FormInput
                  label="Estado"
                  type="text"
                  id="estado"
                  name="estado"
                  placeholder="Ex: Sergipe"
                  value={formData.estado}
                  onChange={handleChange}
                  error={errors.estado}
                  required
                />

                <FormInput
                  label="Cidade"
                  type="text"
                  id="cidade"
                  name="cidade"
                  placeholder="Ex: Aracaju"
                  value={formData.cidade}
                  onChange={handleChange}
                  error={errors.cidade}
                  required
                />
              </div>

              <div className={styles.passwordGrid}>
                <FormInput
                  label="Senha"
                  type="password"
                  id="senha"
                  name="senha"
                  placeholder="••••••••"
                  value={formData.senha}
                  onChange={handleChange}
                  error={errors.senha}
                  required
                />

                <FormInput
                  label="Confirmar Senha"
                  type="password"
                  id="confirmaSenha"
                  name="confirmaSenha"
                  placeholder="••••••••"
                  value={formData.confirmaSenha}
                  onChange={handleChange}
                  error={errors.confirmaSenha}
                  required
                />
              </div>

              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="termo"
                  name="termo"
                  checked={formData.termo}
                  onChange={handleChange}
                />
                <label htmlFor="termo">
                  Eu aceito os <a href="#terms">termos de uso</a> e a <a href="#privacy">política de privacidade</a>
                </label>
                {errors.termo && <span className={styles.error}>{errors.termo}</span>}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="large"
                isFullWidth
                disabled={isLoading}
              >
                {isLoading ? 'Cadastrando...' : 'Criar Conta'}
              </Button>

              <p className={styles.loginLink}>
                Já tem uma conta? <Link to="/login">Faça login</Link>
              </p>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
