import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//Apollo configuration object options
import { split } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { createHttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { demos_gql_http, demos_gql_ws } from './../config/deploy';

//acerca_de
import AcercaDe from './acerca_de/acerca_de';

//administrador
import Administrador from './administrador/administrador';
import ReportarBug from "./administrador/reportar_bug"

//moderador
import Moderador from './moderador/moderador';

//busqueda
import Busqueda from './busqueda/busqueda';

//denuncia
import Denuncia from './denuncia/denuncia';

//elecciones
import Elecciones from './elecciones/elecciones';
//landing_page
import LandingPage from './landing_page/landing_page';
//nacional
import Nacional from './nacional/nacional';
//politico
import Politicos from './politico/politicos';
import PoliticoDetail from './politico/detalle/politico_detail';
import {LoadInformationPropuesta, LoadInformationPolitico, LoadInformationEvento} from './politico/load_information';
import PoliticoForm from './politico/formulario/politico_form';
import EventoForm from './politico/formulario/evento_form';
import PropuestaForm from './politico/formulario/propuesta_form';

//reutilizables
import Footer from './reutilizables/footer';
import NeedLogin from './reutilizables/access/need_login';
import NeedLogout from './reutilizables/access/need_logout';
import Navbar from './reutilizables/navbar';
import NotFound from './reutilizables/not_found';
import ScreenNeedLogin from './reutilizables/access/screen_need_login';

//soporte
import Soporte from './soporte/soporte';

//usuario
import ConfirmEmail from './usuario/confirm_email';
import ConfigCuenta from './usuario/config_cuenta/config_cuenta';
import Login from './usuario/login';
import RecoverPassword from './usuario/recover_password';
import SignUp from './usuario/signup';

const httpLink = createHttpLink({
  uri: `${demos_gql_http}/graphql`,
  credentials: 'include'
});

// Crear el web socket link
const wsLink = new WebSocketLink({
  uri: `${demos_gql_ws}/subscriptions`,
  options: {
    reconnect: true
  }
});

// USar dependencia split para hacer una union de ambos 
// caminos de comunicacion y separa uno del otro
const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  dataIdFromObject: o => o.id
});

class App extends React.Component {

  constructor(props) {
    super(props);
    this.handleRender = this.handleRender.bind(this);
  }

  handleRender() {
    this.render();
  }

  render() {
    // npm run-script dev
    // npm run-script build
    // npm start

    return (
      <ApolloProvider client={client} >
        <BrowserRouter>
          <div>
            <Navbar />
            <MuiThemeProvider>
              <Switch>
                <Route path="/acerca_de" component={AcercaDe} />
                <Route path="/admin" component={NeedLogin(Administrador, "administrador")} />
                <Route path="/confirm_email" component={NeedLogout(ConfirmEmail)} />
                <Route path="/config_cuenta" component={NeedLogin(ConfigCuenta)} />
                <Route path="/login" component={NeedLogout(Login)} />
                <Route path="/recover_password" component={NeedLogout(RecoverPassword)} />
                <Route path="/signup" component={NeedLogout(SignUp)} />
                <Route path="/soporte" component={Soporte} />
                <Route path="/busqueda" component={Busqueda} />
                <Route path="/denuncia" component={Denuncia} />

                <Route path="/politico/modificar/:id" exact component={LoadInformationPolitico(NeedLogin(PoliticoForm,'variable'))} />
                <Route path="/politico/formulario" exact component={NeedLogin(NeedLogin(PoliticoForm,'variable'))} />

                <Route path="/propuesta/modificar/:id" exact component={LoadInformationPropuesta(NeedLogin(PropuestaForm,'variable'))} />
                <Route path="/propuesta/formulario/:id" exact component={NeedLogin(NeedLogin(PropuestaForm,'variable'))} />

                <Route path="/evento/modificar/:id" exact component={LoadInformationEvento(NeedLogin(EventoForm,'variable'))} />
                <Route path="/evento/formulario/:id" exact component={NeedLogin(EventoForm,'variable')} />

                <Route path="/politicos" exact component={Politicos} />
                <Route path="/politico/:id" exact component={PoliticoDetail} />
                <Route path="/bug" component={NeedLogin(ReportarBug)} />} 
                <Route path="/nacional" component={Nacional} />
                <Route path="/elecciones" component={NeedLogin(Elecciones,'variable')} />
                <Route path="/" exact component={LandingPage} />
                <Route path="/moderador" component={NeedLogin(NeedLogin(Moderador, 'variable'), 'moderador')} />  
                <Route path="/need_login" exact component={ScreenNeedLogin} />
                <Route component={NotFound} />
              </Switch>
            </MuiThemeProvider>
            <Footer />
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}
export default App;
