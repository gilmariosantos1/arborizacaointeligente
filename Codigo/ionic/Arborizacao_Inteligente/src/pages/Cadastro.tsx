import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonText,
} from '@ionic/react';
import Header from '../components/Header';
import { useAuth } from '../auth/AuthContext';
import { createUser } from '../services/UserService';
import './ArborizacaoPages.css';

type Estado = {
  id: number;
  nome: string;
  sigla: string;
};

type Cidade = {
  id: number;
  nome: string;
};

const Cadastro: React.FC = () => {
  const history = useHistory();
  const { signed } = useAuth();
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
    termo: false,
  });
  const [estados, setEstados] = useState<Estado[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCidades, setLoadingCidades] = useState(false);

  useEffect(() => {
    async function fetchEstados() {
      try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
        const data: Estado[] = await response.json();
        setEstados(data);
      } catch (error) {
        console.error('Erro ao buscar estados:', error);
        setErrors((prev) => ({ ...prev, estado: 'Erro ao carregar estados.' }));
      }
    }

    fetchEstados();
  }, []);

  useEffect(() => {
    if (!formData.estado) {
      setCidades([]);
      return;
    }

    async function fetchCidades() {
      try {
        setLoadingCidades(true);
        const response = await fetch(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${formData.estado}/municipios`,
        );
        const data: Cidade[] = await response.json();
        setCidades(data);
      } catch (error) {
        console.error('Erro ao buscar cidades:', error);
        setErrors((prev) => ({ ...prev, cidade: 'Erro ao carregar cidades.' }));
      } finally {
        setLoadingCidades(false);
      }
    }

    fetchCidades();
  }, [formData.estado]);

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === 'estado' ? { cidade: '' } : {}),
    }));
  };

  const validateForm = () => {
    const nextErrors: { [key: string]: string } = {};

    if (!formData.nome.trim()) nextErrors.nome = 'Nome é obrigatório';
    if (!formData.email) nextErrors.email = 'E-mail é obrigatório';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) nextErrors.email = 'E-mail inválido';
    if (!formData.cpf.trim()) nextErrors.cpf = 'CPF é obrigatório';
    if (!formData.data_nascimento) nextErrors.data_nascimento = 'Data de nascimento é obrigatória';
    if (!formData.cep.trim()) nextErrors.cep = 'CEP é obrigatório';
    if (!formData.estado) nextErrors.estado = 'Estado é obrigatório';
    if (!formData.cidade) nextErrors.cidade = 'Cidade é obrigatória';
    if (!formData.senha) nextErrors.senha = 'Senha é obrigatória';
    else if (formData.senha.length < 6) nextErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
    if (!formData.confirmaSenha) nextErrors.confirmaSenha = 'Confirme a senha';
    else if (formData.confirmaSenha !== formData.senha) nextErrors.confirmaSenha = 'As senhas não correspondem';
    if (!formData.termo) nextErrors.termo = 'Você deve aceitar os termos';

    return nextErrors;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const payload = {
        nome: formData.nome.trim(),
        email: formData.email.trim(),
        senha: formData.senha,
        cpf: formData.cpf.trim(),
        cep: formData.cep.trim(),
        estado: formData.estado.trim().toUpperCase(),
        cidade: formData.cidade.trim(),
        data_nascimento: formData.data_nascimento,
      };

      await createUser(payload);

      setIsLoading(false);
      history.push('/login');
    } catch (error: any) {
      setIsLoading(false);
      const message = error.response?.data?.erro || error.response?.data?.message || 'Erro ao cadastrar usuário.';
      setErrors({ geral: message });
    }
  };

  if (signed) {
    return (
      <IonPage>
        <Header />
        <IonContent className="page-content">
          <div className="auth-card">
            <IonText className="centered">
              <h2>Bem-vindo</h2>
            </IonText>
            <p className="small-muted centered">Você está autenticado no sistema.</p>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <Header />
      <IonContent className="page-content">
        <div className="form-card">
          <IonText>
            <h2 className="section-title">Junte-se a Nós</h2>
          </IonText>
          <p className="section-subtitle">Comece sua jornada contribuindo para cidades mais verdes.</p>

          <form onSubmit={handleSubmit} className="form-grid">
            {errors.geral && <div className="error-text">{errors.geral}</div>}

            <div className="form-row">
              <IonItem lines="full">
                <IonLabel position="floating">Nome Completo</IonLabel>
                <IonInput value={formData.nome} onIonChange={(e) => handleChange('nome', String(e.detail.value ?? ''))} />
              </IonItem>
              <IonItem lines="full">
                <IonLabel position="floating">E-mail</IonLabel>
                <IonInput type="email" value={formData.email} onIonChange={(e) => handleChange('email', String(e.detail.value ?? ''))} />
              </IonItem>
            </div>
            {errors.nome && <div className="error-text">{errors.nome}</div>}
            {errors.email && <div className="error-text">{errors.email}</div>}

            <div className="form-row">
              <IonItem lines="full">
                <IonLabel position="floating">CPF</IonLabel>
                <IonInput value={formData.cpf} onIonChange={(e) => handleChange('cpf', String(e.detail.value ?? ''))} />
              </IonItem>
              <IonItem lines="full">
                <IonLabel position="floating">Data de Nascimento</IonLabel>
                <IonInput type="date" value={formData.data_nascimento} onIonChange={(e) => handleChange('data_nascimento', String(e.detail.value ?? ''))} />
              </IonItem>
            </div>
            {errors.cpf && <div className="error-text">{errors.cpf}</div>}
            {errors.data_nascimento && <div className="error-text">{errors.data_nascimento}</div>}

            <div className="form-row">
              <IonItem lines="full">
                <IonLabel position="floating">CEP</IonLabel>
                <IonInput value={formData.cep} onIonChange={(e) => handleChange('cep', String(e.detail.value ?? ''))} />
              </IonItem>
              <IonItem lines="full">
                <IonLabel>Estado</IonLabel>
                <IonSelect value={formData.estado} onIonChange={(e) => handleChange('estado', String(e.detail.value ?? ''))}>
                  <IonSelectOption value="">Selecione</IonSelectOption>
                  {estados.map((estado) => (
                    <IonSelectOption key={estado.sigla} value={estado.sigla}>{estado.nome}</IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </div>
            {errors.cep && <div className="error-text">{errors.cep}</div>}
            {errors.estado && <div className="error-text">{errors.estado}</div>}

            <IonItem lines="full">
              <IonLabel>Cidade</IonLabel>
              <IonSelect
                value={formData.cidade}
                onIonChange={(e) => handleChange('cidade', String(e.detail.value ?? ''))}
                disabled={!formData.estado || loadingCidades}
              >
                <IonSelectOption value="">{loadingCidades ? 'Carregando cidades...' : 'Selecione'}</IonSelectOption>
                {cidades.map((cidade) => (
                  <IonSelectOption key={cidade.id} value={cidade.nome}>{cidade.nome}</IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            {errors.cidade && <div className="error-text">{errors.cidade}</div>}

            <div className="form-row">
              <IonItem lines="full">
                <IonLabel position="floating">Senha</IonLabel>
                <IonInput type="password" value={formData.senha} onIonChange={(e) => handleChange('senha', String(e.detail.value ?? ''))} />
              </IonItem>
              <IonItem lines="full">
                <IonLabel position="floating">Confirmar Senha</IonLabel>
                <IonInput type="password" value={formData.confirmaSenha} onIonChange={(e) => handleChange('confirmaSenha', String(e.detail.value ?? ''))} />
              </IonItem>
            </div>
            {errors.senha && <div className="error-text">{errors.senha}</div>}
            {errors.confirmaSenha && <div className="error-text">{errors.confirmaSenha}</div>}

            <IonItem lines="none">
              <IonCheckbox
                checked={formData.termo}
                onIonChange={(e) => handleChange('termo', Boolean(e.detail.checked))}
              />
              <IonLabel>Eu aceito os termos de uso e a política de privacidade.</IonLabel>
            </IonItem>
            {errors.termo && <div className="error-text">{errors.termo}</div>}

            <IonButton type="submit" expand="block" shape="round" disabled={isLoading}>
              {isLoading ? 'Cadastrando...' : 'Criar Conta'}
            </IonButton>

            <p className="small-muted centered">
              Já tem uma conta?{' '}
              <a href="#" onClick={() => history.push('/login')} className="inline-link">Faça login</a>
            </p>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Cadastro;
