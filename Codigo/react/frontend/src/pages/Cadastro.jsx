import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FormInput from '../components/FormInput'
import FormSelect from '../components/FormSelect'
import Button from '../components/Button'
import styles from '../styles/Cadastro.module.css'
import { createUser } from '../services/UserService';
import { useAuth } from '../auth/AuthContext';

export default function Cadastro() {
  const [cidades, setCidades] = useState([]);
  const [estados, setEstados] = useState([]);
  const [loadingCidades, setLoadingCidades] = useState(false);

  const navigate = useNavigate()

  const { signed, user, logout } = useAuth()

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    data_nascimento: '',
    cep: '',
    estado: '',
    cidade: '',
    senha: '',
    confirmaSenha: '',
    termo: false
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchEstados() {
      try {
        const response = await fetch(
          'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
        )
        const data = await response.json()
        setEstados(data)
      } catch (error) {
        console.error('Erro ao buscar estados:', error)
      }
    }
    fetchEstados()
  }, [])

  useEffect(() => {
    if (!formData.estado) {
      setCidades([])
      return
    }

    async function fetchCidades() {
      try {
        setLoadingCidades(true)
        const response = await fetch(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${formData.estado}/municipios`
        )
        const data = await response.json()
        setCidades(data)
      } catch (error) {
        console.error('Erro ao buscar cidades:', error)
      } finally {
        setLoadingCidades(false)
      }
    }

    fetchCidades()
  }, [formData.estado])


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'estado' ? { cidade: '' } : {})
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

    if (!formData.data_nascimento) {
      newErrors.data_nascimento = 'Data de nascimento é obrigatória'
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
    e.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      try {
        setIsLoading(true);

        const { confirmaSenha, ...userData } = formData;

        const response = await createUser(userData);

        console.log(response.data);

        alert('Cadastro realizado com sucesso!');

        setFormData({
          nome: '',
          email: '',
          cpf: '',
          data_nascimento: '',
          cep: '',
          estado: '',
          cidade: '',
          senha: '',
          confirmaSenha: '',
          termo: false
        });

      } catch (error) {

        console.error(error);

        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert('Erro ao conectar com o servidor');
        }

      } finally {
        setIsLoading(false);
      }

    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className={styles.container}>
      {signed ? (
        navigate("/")
      ) : (
        <div>
          <Header />

      <main className={styles.main}>
        <div className={styles.formWrapper}>
          <div className={styles.welcomeSection}>
            <div className={styles.welcomeContent}>
              <Link to="/" className={styles.logoLink}>
                <img src="/imagens/salvando-a-terra-com-tecnologia-artificial 2.png" alt="Logo" className={styles.logo} />
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
                  id="data_nascimento"
                  name="data_nascimento"
                  value={formData.data_nascimento}
                  onChange={handleChange}
                  error={errors.data_nascimento}
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

                <FormSelect
                  label="Estado"
                  id="estado"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  error={errors.estado}
                  required
                >
                  <option value="">Selecione o estado</option>
                  {estados.map((uf) => (
                    <option key={uf.id} value={uf.sigla}>
                      {uf.sigla}
                    </option>
                  ))}
                </FormSelect>

                <FormSelect
                  label="Cidade"
                  id="cidade"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  error={errors.cidade}
                  required
                >
                  <option value="">
                    {loadingCidades ? 'Carregando...' : 'Selecione a cidade'}
                  </option>
                  {cidades.map((cidade) => (
                    <option key={cidade.id} value={cidade.nome}>
                      {cidade.nome}
                    </option>
                  ))}
                </FormSelect>
                
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
      )}
      
    </div>
  )
}