import {
  IonButton,
  IonContent,
  IonPage,
  IonText,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../auth/AuthContext';
import './ArborizacaoPages.css';

const Home: React.FC = () => {
  const history = useHistory();
  const { } = useAuth();

  const benefits = [
    { icon: '🌳', title: 'Qualidade do Ar', desc: 'As árvores absorvem CO₂ e filtram poluentes, melhorando a qualidade do ar urbano.' },
    { icon: '❄️', title: 'Redução de Temperatura', desc: 'Criam sombra e reduzem o efeito "ilha de calor".' },
    { icon: '💧', title: 'Controle de Enchentes', desc: 'Absorvem água da chuva e regulam o ciclo hidrológico.' },
    { icon: '❤️', title: 'Bem-estar Mental', desc: 'A proximidade com natureza reduz estresse e melhora a saúde mental.' },
    { icon: '🌍', title: 'Mitigação Climática', desc: 'Capturam CO₂ e ajudam a reduzir mudanças climáticas.' },
    { icon: '🦋', title: 'Biodiversidade', desc: 'Fornecem habitat para aves, insetos e mamíferos.' },
  ];

  const reasons = [
    { number: '01', title: 'Sustentabilidade', desc: 'Contribui para cidades mais sustentáveis e resilientes.' },
    { number: '02', title: 'Saúde Pública', desc: 'Melhora a qualidade de vida e reduz doenças respiratórias.' },
    { number: '03', title: 'Comunidade', desc: 'Cria espaços verdes para convivência e bem-estar.' },
    { number: '04', title: 'Valorização', desc: 'Aumenta o valor do imóvel e atrai moradores.' },
  ];

  return (
    <IonPage>
      <Header />
      <IonContent className="page-content">
        <div className="hero-panel">
          <IonText>
            <h1>Arborização Inteligente para Cidades Sustentáveis</h1>
          </IonText>
          <p>Transforme o ambiente urbano através de soluções inovadoras de arborização.</p>
          <div className="button-row">
            <IonButton onClick={() => window.open('https://www.ufsm.br/unidades-universitarias/ccne/2024/06/20/a-importancia-da-arborizacao-urbana-para-cidades-sustentaveis', '_blank')}>
              Saiba Mais
            </IonButton>
            <IonButton fill="outline" onClick={() => history.push('/contato')}>
              Entre em Contato
            </IonButton>
          </div>
        </div>

        <div className="section-block">
          <h2 className="section-title">Conheça Nosso Movimento</h2>
          <p className="section-subtitle">Assista ao vídeo e entenda a importância da arborização.</p>
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/hbw9idS-8OA?si=ta4Y-lffMSiJUJ9s"
              title="YouTube video about smart arborization"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        <div className="section-block">
          <h2 className="section-title">O que é Arborização?</h2>
          <div className="story-layout">
            <img src="/imagens/image 3.png" alt="Igreja verde ao pôr do sol" />
            <div className="story-card">
              <p>
                A arborização refere-se ao processo de plantio e manutenção inteligente de árvores em áreas urbanas.
                É uma prática essencial para a criação de ambientes mais verdes e saudáveis nas cidades.
              </p>
              <p>
                Envolve a escolha adequada das espécies, plantio correto e manutenção contínua para melhorar a qualidade
                do ar, reduzir a poluição e absorver dióxido de carbono.
              </p>
            </div>
          </div>
        </div>

        <div className="section-block">
          <h2 className="section-title">Benefícios da Arborização</h2>
          <div className="card-grid">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="feature-card">
                <div className="feature-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="section-block">
          <h2 className="section-title">Por que Arborizar as Cidades?</h2>
          <div className="card-grid">
            {reasons.map((reason) => (
              <div key={reason.number} className="feature-card">
                <div className="feature-icon">{reason.number}</div>
                <h3>{reason.title}</h3>
                <p>{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="cta-panel">
          <h2>Faça Parte da Revolução Verde</h2>
          <p>Junte-se a nós na missão de transformar cidades em ambientes mais sustentáveis e saudáveis.</p>
          <div className="button-row" style={{ justifyContent: 'center' }}>
            <IonButton onClick={() => history.push('/cadastro')} shape="round">Comece Agora</IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
