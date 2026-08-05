import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTextarea,
  IonText,
} from '@ionic/react';
import './ArborizacaoPages.css';
import Header from '../components/Header';
import { useAuth } from '../auth/AuthContext';

const Contato: React.FC = () => {
  const history = useHistory();
  const { } = useAuth();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const contactInfo = [
    { icon: '📍', title: 'Localização', value: 'Nossa Senhora da Glória, Sergipe, Brasil' },
    { icon: '📧', title: 'E-mail', value: 'example@gmail.com' },
    { icon: '📱', title: 'Telefone', value: '+55 (79) 3214-1234' },
    { icon: '🕐', title: 'Horário', value: 'Seg-Sex: 09:00 às 18:00' },
  ];

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const nextErrors: { [key: string]: string } = {};

    if (!formData.nome.trim()) nextErrors.nome = 'Nome é obrigatório';
    if (!formData.email) nextErrors.email = 'E-mail é obrigatório';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) nextErrors.email = 'E-mail inválido';
    if (!formData.assunto.trim()) nextErrors.assunto = 'Assunto é obrigatório';
    if (!formData.mensagem.trim()) nextErrors.mensagem = 'Mensagem é obrigatória';
    else if (formData.mensagem.trim().length < 10) nextErrors.mensagem = 'Mensagem deve ter pelo menos 10 caracteres';

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

    setTimeout(() => {
      setSubmitSuccess(true);
      setFormData({ nome: '', email: '', assunto: '', mensagem: '' });
      setIsLoading(false);
    }, 700);
  };

  return (
    <IonPage>
      <Header />
      <IonContent className="page-content">
        <div className="hero-panel">
          <IonText>
            <h1>Entre em Contato</h1>
          </IonText>
          <p>Estamos aqui para ouvir suas ideias e responder suas dúvidas.</p>
        </div>

        <div className="section-block">
          <h2 className="section-title">Informações</h2>
          <div className="card-grid">
            {contactInfo.map((info) => (
              <div key={info.title} className="info-card">
                <div className="info-icon">{info.icon}</div>
                <h3>{info.title}</h3>
                <p>{info.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="section-block">
          <h2 className="section-title">Envie uma Mensagem</h2>
          <div className="form-card">
            {submitSuccess && <div className="status-message">✓ Mensagem enviada com sucesso! Obrigado por entrar em contato.</div>}

            <form onSubmit={handleSubmit} className="form-grid">
              <div className="form-row">
                <IonItem lines="full">
                  <IonLabel position="stacked">Nome Completo</IonLabel>
                  <IonInput value={formData.nome} onIonChange={(e) => handleChange('nome', String(e.detail.value ?? ''))} />
                </IonItem>
                <IonItem lines="full">
                  <IonLabel position="stacked">E-mail</IonLabel>
                  <IonInput type="email" value={formData.email} onIonChange={(e) => handleChange('email', String(e.detail.value ?? ''))} />
                </IonItem>
              </div>
              {errors.nome && <div className="error-text">{errors.nome}</div>}
              {errors.email && <div className="error-text">{errors.email}</div>}

              <IonItem lines="full">
                <IonLabel position="stacked">Assunto</IonLabel>
                <IonInput value={formData.assunto} onIonChange={(e) => handleChange('assunto', String(e.detail.value ?? ''))} />
              </IonItem>
              {errors.assunto && <div className="error-text">{errors.assunto}</div>}

              <IonItem lines="full">
                <IonLabel position="stacked">Mensagem</IonLabel>
                <IonTextarea rows={5} value={formData.mensagem} onIonChange={(e) => handleChange('mensagem', String(e.detail.value ?? ''))} />
              </IonItem>
              {errors.mensagem && <div className="error-text">{errors.mensagem}</div>}

              <IonButton type="submit" expand="block" shape="round" disabled={isLoading}>
                {isLoading ? 'Enviando...' : 'Enviar Mensagem'}
              </IonButton>
            </form>
          </div>
        </div>

        <div className="section-block">
          <h2 className="section-title">Precisa de Mais Informações?</h2>
          <div className="card-grid">
            <div className="contact-card">
              <h3>📚 Documentação</h3>
              <p>Acesse nossa base de conhecimento com guias completos sobre arborização inteligente.</p>
            </div>
            <div className="contact-card">
              <h3>💬 FAQ</h3>
              <p>Confira as perguntas frequentes e encontre respostas para as dúvidas mais comuns.</p>
            </div>
            <div className="contact-card">
              <h3>🤝 Parcerias</h3>
              <p>Interessado em ser parceiro? Saiba mais sobre nossas oportunidades de colaboração.</p>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Contato;
