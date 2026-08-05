import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import './ArborizacaoPages.css';
import { useAuth } from '../auth/AuthContext';

const RedefinirSenha: React.FC = () => {
  const history = useHistory();
  const { } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'email' | 'nova-senha'>('email');

  const validateEmail = () => {
    const nextErrors: { [key: string]: string } = {};

    if (!email.trim()) nextErrors.email = 'E-mail é obrigatório';
    else if (!/\S+@\S+\.\S+/.test(email)) nextErrors.email = 'E-mail inválido';

    return nextErrors;
  };

  const validateReset = () => {
    const nextErrors: { [key: string]: string } = {};

    if (!senha) nextErrors.senha = 'A nova senha é obrigatória';
    else if (senha.length < 6) nextErrors.senha = 'A senha deve ter pelo menos 6 caracteres';

    if (!confirmarSenha) nextErrors.confirmarSenha = 'Confirme a nova senha';
    else if (confirmarSenha !== senha) nextErrors.confirmarSenha = 'As senhas não coincidem';

    return nextErrors;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors({});
    setMessage('');

    const nextErrors = step === 'email' ? validateEmail() : validateReset();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (step === 'email') {
        setMessage('Instruções enviadas com sucesso.');
        setStep('nova-senha');
      } else {
        setMessage('Senha redefinida com sucesso.');
      }
    }, 700);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Redefinir Senha</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="page-content">
        <div className="form-card">
          <IonText>
            <h2 className="section-title">Redefinição de Senha</h2>
          </IonText>
          <p className="section-subtitle">
            {step === 'email'
              ? 'Informe o e-mail da sua conta para receber o link de recuperação.'
              : 'Escolha uma nova senha para concluir a recuperação.'}
          </p>

          <form onSubmit={handleSubmit} className="form-grid">
            {step === 'email' ? (
              <>
                <IonItem lines="full">
                  <IonLabel position="stacked">E-mail</IonLabel>
                  <IonInput type="email" value={email} onIonChange={(e) => setEmail(String(e.detail.value ?? ''))} />
                </IonItem>
                {errors.email && <div className="error-text">{errors.email}</div>}
              </>
            ) : (
              <>
                <IonItem lines="full">
                  <IonLabel position="stacked">Nova senha</IonLabel>
                  <IonInput type="password" value={senha} onIonChange={(e) => setSenha(String(e.detail.value ?? ''))} />
                </IonItem>
                {errors.senha && <div className="error-text">{errors.senha}</div>}

                <IonItem lines="full">
                  <IonLabel position="stacked">Confirmar senha</IonLabel>
                  <IonInput type="password" value={confirmarSenha} onIonChange={(e) => setConfirmarSenha(String(e.detail.value ?? ''))} />
                </IonItem>
                {errors.confirmarSenha && <div className="error-text">{errors.confirmarSenha}</div>}
              </>
            )}

            {message && <div className="status-message">{message}</div>}

            <IonButton type="submit" expand="block" shape="round" disabled={isLoading}>
              {isLoading ? 'Enviando...' : step === 'email' ? 'Enviar instruções' : 'Redefinir senha'}
            </IonButton>
          </form>

          <div className="centered" style={{ marginTop: '16px' }}>
            <IonButton fill="clear" onClick={() => history.push('/login')}>Voltar ao login</IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RedefinirSenha;
