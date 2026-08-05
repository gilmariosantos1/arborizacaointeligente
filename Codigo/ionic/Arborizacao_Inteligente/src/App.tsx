import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import SobreNos from './pages/SobreNos';
import Contato from './pages/Contato';
import Upload from './pages/Upload';
import RedefinirSenha from './pages/RedefinirSenha';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utilities */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';

import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/cadastro" component={Cadastro} exact />
        <Route path="/sobre-nos" component={SobreNos} exact />
        <Route path="/contato" component={Contato} exact />
        <Route path="/upload" component={Upload} exact />
        <Route path="/redefinir-senha" component={RedefinirSenha} exact />
        <Route render={() => <Redirect to="/" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
