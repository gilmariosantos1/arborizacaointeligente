import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Section from '../components/Section'
import FormInput from '../components/FormInput'
import Button from '../components/Button'
import Card from '../components/Card'
import styles from '../styles/Contato.module.css'

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: ''
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
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

    if (!formData.assunto.trim()) {
      newErrors.assunto = 'Assunto é obrigatório'
    }

    if (!formData.mensagem.trim()) {
      newErrors.mensagem = 'Mensagem é obrigatória'
    } else if (formData.mensagem.trim().length < 10) {
      newErrors.mensagem = 'Mensagem deve ter pelo menos 10 caracteres'
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
        console.log('Contato:', formData)
        setIsLoading(false)
        setSubmitSuccess(true)
        setFormData({ nome: '', email: '', assunto: '', mensagem: '' })
        
        // Limpar mensagem de sucesso após 5 segundos
        setTimeout(() => setSubmitSuccess(false), 5000)
      }, 1000)
    } else {
      setErrors(newErrors)
    }
  }

  const contactInfo = [
    {
      icon: '📍',
      title: 'Localização',
      content: 'Nossa Senhora da Glória, Sergipe, Brasil'
    },
    {
      icon: '📧',
      title: 'E-mail',
      content: 'example@gmail.com'
    },
    {
      icon: '📱',
      title: 'Telefone',
      content: '+55 (79) 3214-1234'
    },
    {
      icon: '🕐',
      title: 'Horário',
      content: 'Seg-Sex: 09:00 às 18:00'
    }
  ]

  return (
    <div className={styles.container}>
      <Header />
      
      <main className={styles.main}>
        {/* Hero Section */}
        <Section 
          className={styles.heroSection} 
          hasBackground
          title="Entre em Contato"
          subtitle="Estamos aqui para ouvir suas ideias e responder suas dúvidas"
        ></Section>

        {/* Contact Info Cards */}
        <Section title="Informações" subtitle="Como você pode nos encontrar">
          <div className={styles.infoGrid}>
            {contactInfo.map((info, idx) => (
              <Card key={idx} variant="elevated">
                <div className={styles.infoCard}>
                  <div className={styles.infoIcon}>{info.icon}</div>
                  <h3>{info.title}</h3>
                  <p>{info.content}</p>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* Contact Form */}
        <Section 
          title="Envie uma Mensagem" 
          subtitle="Preencha o formulário abaixo e entraremos em contato em breve"
          hasBackground={true}
          variant="light"
        >
          <div className={styles.formWrapper}>
            {submitSuccess && (
              <div className={styles.successMessage}>
                ✓ Mensagem enviada com sucesso! Obrigado por entrar em contato.
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.formGrid}>
                <FormInput
                  label="Nome Completo"
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Seu nome"
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
              </div>

              <FormInput
                label="Assunto"
                type="text"
                id="assunto"
                name="assunto"
                placeholder="Qual é o assunto da sua mensagem?"
                value={formData.assunto}
                onChange={handleChange}
                error={errors.assunto}
                required
              />

              <div className={styles.formGroup}>
                <label htmlFor="mensagem" className={styles.label}>
                  Mensagem <span className={styles.required}>*</span>
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  placeholder="Escreva sua mensagem aqui..."
                  rows="6"
                  value={formData.mensagem}
                  onChange={handleChange}
                  className={`${styles.textarea} ${errors.mensagem ? styles.error : ''}`}
                  required
                ></textarea>
                {errors.mensagem && (
                  <span className={styles.errorMsg}>{errors.mensagem}</span>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="large"
                disabled={isLoading}
              >
                {isLoading ? 'Enviando...' : 'Enviar Mensagem'}
              </Button>
            </form>
          </div>
        </Section>

        {/* Support Section */}
        <Section title="Precisa de Mais Informações?" subtitle="Visite nossas seções de documentação">
          <div className={styles.supportGrid}>
            <Card variant="outlined">
              <h3>📚 Documentação</h3>
              <p>Acesse nossa base de conhecimento com guias completos sobre arborização inteligente.</p>
            </Card>
            <Card variant="outlined">
              <h3>💬 FAQ</h3>
              <p>Confira as perguntas frequentes e encontre respostas para as dúvidas mais comuns.</p>
            </Card>
            <Card variant="outlined">
              <h3>🤝 Parcerias</h3>
              <p>Interessado em ser parceiro? Saiba mais sobre nossas oportunidades de colaboração.</p>
            </Card>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  )
}
