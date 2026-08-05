import {
  IonButton,
  IonContent,
  IonPage,
} from '@ionic/react';
import Header from '../components/Header';
import './ArborizacaoPages.css';

const Aplicativo: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent className="page-content">
        <div className="section-block">
          <h2 className="section-title">Aplicativo</h2>
          <div className="story-layout">
            <div className="app-card">
              <img src="/imagens/aplicativo.png" alt="Aplicativo Arborização Inteligente" />
              <h3>Arborização Inteligente</h3>
              <p>
                O aplicativo conta com um sistema de monitoramento para localizar árvores, identificar espécies e
                verificar riscos em áreas próximas a postes, casas e pontos críticos.
              </p>
            </div>
          </div>
        </div>

        <div className="section-block">
          <div className="app-card centered">
            <h3>Baixe o aplicativo!</h3>
            <IonButton expand="block" shape="round">Clique aqui para instalar</IonButton>
            <div style={{ marginTop: '16px' }}>
              <img src="/imagens/aplicativo.png" alt="Preview do aplicativo" />
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Aplicativo;
