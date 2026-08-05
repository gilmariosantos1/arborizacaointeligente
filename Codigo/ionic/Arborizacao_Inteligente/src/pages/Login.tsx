import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonText,
} from '@ionic/react';
import Header from '../components/Header';
import { useAuth } from '../auth/AuthContext';
import './ArborizacaoPages.css';

const Login: React.FC = () => {
  const history = useHistory();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const nextErrors: { [key: string]: string } = {};

    if (!email.trim()) {
      nextErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      nextErrors.email = 'E-mail inválido';
    }

    if (!senha.trim()) {
      nextErrors.senha = 'Senha é obrigatória';
    } else if (senha.length < 6) {
      nextErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
    }

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

    const result = await login(email, senha);
    setIsLoading(false);

    if (result.success) {
      history.push('/');
      return;
    }

    setErrors({ geral: result.message || 'Erro ao realizar login.' });
  };

  return (
    <IonPage>
      <Header />
      <IonContent className="page-content auth-page-content">
        <div className="auth-card">
          <img
            className="logo"
            src="/imagens/salvando-a-terra-com-tecnologia-artificial 2.png"
            alt="Logo Arborização Inteligente"
          />
          <IonText className="centered">
            <h2>Bem-vindo de Volta</h2>
          </IonText>
          <p className="small-muted centered">Faça login para acessar sua conta</p>

          <form onSubmit={handleSubmit} className="form-grid">
            {errors.geral && <div className="error-text">{errors.geral}</div>}

            <IonItem lines="full">
              <IonLabel position="stacked">E-mail</IonLabel>
              <IonInput
                type="email"
                value={email}
                onIonChange={(e) => setEmail(String(e.detail.value ?? ''))}
              />
            </IonItem>
            {errors.email && <div className="error-text">{errors.email}</div>}

            <IonItem lines="full">
              <IonLabel position="stacked">Senha</IonLabel>
              <IonInput
                type="password"
                value={senha}
                onIonChange={(e) => setSenha(String(e.detail.value ?? ''))}
              />
            </IonItem>
            {errors.senha && <div className="error-text">{errors.senha}</div>}

            <div className="centered">
              <IonButton fill="clear" size="small" color="primary" onClick={() => history.push('/redefinir-senha')}>
                Esqueceu sua senha?
              </IonButton>
            </div>

            <IonButton type="submit" expand="block" shape="round" disabled={isLoading}>
              {isLoading ? 'Entrando...' : 'Entrar'}
            </IonButton>
          </form>

          <div className="centered" style={{ marginTop: '16px' }}>
            <IonText color="medium">Novo por aqui?</IonText>
          </div>

          <IonButton expand="block" fill="outline" shape="round" onClick={() => history.push('/cadastro')}>
            Criar Conta
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
