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

const SobreNos: React.FC = () => {
  const history = useHistory();
  const { } = useAuth();

  const mission = [
    { icon: '🎯', title: 'Nossa Missão', desc: 'Promover arborização inteligente e sustentável nas cidades através de tecnologia e engajamento comunitário.' },
    { icon: '👁️', title: 'Nossa Visão', desc: 'Cidades mais verdes, saudáveis e sustentáveis para as futuras gerações.' },
    { icon: '💚', title: 'Nossos Valores', desc: 'Sustentabilidade, inovação, comunidade e comprometimento com o meio ambiente.' },
  ];

  return (
    <IonPage>
      <Header />
      <IonContent className="page-content">
        <div className="hero-panel">
          <IonText>
            <h1>Sobre Nós</h1>
          </IonText>
          <p>Conheça a história e a visão por trás da Arborização Inteligente.</p>
        </div>

        <div className="section-block">
          <h2 className="section-title">Nossa História</h2>
          <div className="story-layout">
            <img src="/imagens/imagem-integrantes.png" alt="Equipe do projeto" />
            <div className="story-card">
              <p>
                O projeto Arborização Inteligente surgiu da necessidade de promover um ambiente mais verde e saudável.
                A ausência de árvores locais e a falta de preservação do bioma gera problemas climáticos urbanos e
                impactos na qualidade de vida.
              </p>
              <p>
                Com isso, criamos um sistema inteligente de monitoramento arbóreo e geolocalização de espécies para
                ajudar pessoas e municípios a agir com mais consciência ambiental.
              </p>
            </div>
          </div>
        </div>

        <div className="section-block">
          <h2 className="section-title">Princípios</h2>
          <div className="card-grid">
            {mission.map((item) => (
              <div key={item.title} className="mission-card">
                <div className="mission-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="section-block">
          <h2 className="section-title">Nossa Tecnologia</h2>
          <div className="card-grid">
            <div className="tech-card">
              <img src="/imagens/planta-tecnologica.png" alt="Planta tecnológica" />
              <h3>Monitoramento Inteligente</h3>
              <p>Sistema avançado de monitoramento de árvores em tempo real com dados precisos.</p>
            </div>
            <div className="tech-card">
              <img src="/imagens/arvore-tecnologica.png" alt="Árvore tecnológica" />
              <h3>Análise de Dados</h3>
              <p>Análise inteligente de padrões de arborização para otimizar estratégias de plantio.</p>
            </div>
          </div>
        </div>

        <div className="section-block">
          <h2 className="section-title">Nosso Impacto</h2>
          <div className="card-grid">
            <div className="feature-card">
              <div className="feature-icon">🌳</div>
              <h3>100+</h3>
              <p>Árvores monitoradas</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>50+</h3>
              <p>Contribuidores</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏙️</div>
              <h3>1</h3>
              <p>Cidade transformada</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">♻️</div>
              <h3>∞</h3>
              <p>Futuro sustentável</p>
            </div>
          </div>
        </div>

        <div className="cta-panel">
          <h2>Faça parte da mudança</h2>
          <p>Junte-se à nossa missão de transformar cidades em espaços mais verdes e saudáveis.</p>
          <div className="button-row" style={{ justifyContent: 'center' }}>
            <IonButton onClick={() => history.push('/cadastro')} shape="round">Comece agora</IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SobreNos;
