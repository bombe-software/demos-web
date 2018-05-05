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
import { demos_gql_http, demos_gql_ws } from './../deploy';

//acerca_de
import AcercaDe from './components/acerca_de/acerca_de';

//administrador
import Administrador from './components/administrador/administrador';


//busqueda
import Busqueda from './components/busqueda/busqueda';

//elecciones

//landing_page

//nacional

//politico
import Politicos from './components/politico/politicos';
import LoadInformation from './components/politico/load_information';
import PoliticoForm from './components/politico/formulario/politico_form';
import EventoForm from './components/politico/formulario/evento_form';
import PropuestaForm from './components/politico/formulario/propuesta_form';

//reutilizables
import Footer from './components/reutilizables/footer';
import NeedLogin from './components/reutilizables/access/need_login';
import NeedLogout from './components/reutilizables/access/need_logout';
import Navbar from './components/reutilizables/navbar';
import NotFound from './components/reutilizables/not_found';
import ScreenNeedLogin from './components/reutilizables/access/screen_need_login';

//soporte
import Soporte from './components/soporte/soporte';

//usuario
import ConfirmEmail from './components/usuario/confirm_email';
import ConfigCuenta from './components/usuario/config_cuenta/config_cuenta';
import Login from './components/usuario/login';
import RecoverPassword from './components/usuario/recover_password';
import SignUp from './components/usuario/signup';

const httpLink = createHttpLink({
  uri: `${demos_gql_http}/graphql`,
  credentials: 'include'
});

// Crear el web socket link
const wsLink = new WebSocketLink({
  uri: `${demos_gql_ws}/subscriptions`,
  options: {
    reconnect: true
  },
  credentials: 'include'
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

                <Route path="/politico/modificar/:id" component={LoadInformation(NeedLogin(PoliticoForm))} />
                <Route path="/politico/formulario" component={NeedLogin(PoliticoForm)} />

                <Route path="/propuesta/modificar/:id" component={LoadInformation(NeedLogin(PropuestaForm))} />
                <Route path="/propuesta/formulario/:id" component={NeedLogin(PropuestaForm)} />

                <Route path="/evento/modificar/:id" component={LoadInformation(NeedLogin(EventoForm))} />
                <Route path="/evento/formulario/:id" component={NeedLogin(EventoForm)} />

                <Route path="/politicos" component={Politicos} />
                

                {/*
                <Route path="/" exact component={LandingPage} />
                <Route path="/nacional" component={Nacional} /> 
                <Route path="/bug" component={ReportarBug} />}
                <Route path="/politico/:id" component={PoliticoDetail} />
                <Route path="/elecciones" component={Elecciones} />
                
                <Route path="/moderador" component={Moderador} />
                
                */}
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

ReactDOM.render(<App />, document.getElementById('root'));
