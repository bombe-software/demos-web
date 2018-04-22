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
//import { createUploadLink } from 'apollo-upload-client';

//Sin manejo de informacion
import NotFound from './components/not_found';
import ErrorScreen from './components/error_screen';
import LandingPage from './components/landing_page/landing_page';


//Genericos
import Footer from './components/generic/footer';
import Navbar from './components/generic/navbar';

import SignUp from './components/signup';
import Login from './components/login';

import ConfirmEmail from './components/confirm_email';
import RecoverPassword from './components/recover_password';
import ConfigCuenta from './components/config_cuenta/config_cuenta';

import Elecciones from './components/elecciones/elecciones';
import AcercaDe from './components/acerca_de/acerca_de';
import Politicos from './components/politico/politicos';
import PoliticoDetail from './components/politico/politico_detail/politico_detail';

import PoliticoForm from './components/politico/politico_create/politico_form';
import PropuestaForm from './components/politico/politico_create/propuesta_form';
import EventoForm from './components/politico/politico_create/evento_form';

import PropuestaSeleccionada from './components/politico/politico_detail/propuesta_seleccionada';
import EventoSeleccionado from './components/politico/politico_detail/evento_seleccionado';

import Moderador from './components/moderador/moderador';

import Administrador from './components/administrador/administrador';
import ReportarBug from './components/administrador/reportar_bug';

import Soporte from './components/soporte/soporte';
import ModificarEvento from './components/politico/politico_modify/evento_form';
import ModificarPolitico from './components/politico/politico_modify/politico_form';
import ModificarPropuesta from './components/politico/politico_modify/propuesta_form';
import Nacional from './components/nacional/nacional';

import { demos_gql_http, demos_gql_ws } from './../deploy';

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

//Pruebas 
/*
const uploadLink = createUploadLink({
  uri: 'https://demos-gql.herokuapp.com/graphql',
  credentials: 'include'
});
*/


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
  
  constructor(props){
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
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <Route path="/confirm_email" component={ConfirmEmail} />
              <Route path="/recover_password" component={RecoverPassword} />
              <Route path="/config_cuenta" component={ConfigCuenta} />
              <Route path="/nacional" component={Nacional} />

              <Route path="/elecciones" component={Elecciones} />
              <Route path="/acerca_de" component={AcercaDe} />
              <Route path="/politicos" component={Politicos} />
              <Route path="/moderador" component={Moderador} />
              <Route path="/admin" component={Administrador} />
              <Route path="/bug" component={ReportarBug} />
              
              <Route path="/soporte" component={Soporte} />
             
              <Route path="/login" component={Login}/>
      
              
              <Route path="/crear/politico" component={PoliticoForm} />
              <Route path="/crear/propuesta" component={PropuestaForm} />
              <Route path="/crear/evento" component={EventoForm} />

                <Route path="/crear/politico" component={PoliticoForm} />
                <Route path="/crear/propuesta" component={PropuestaForm} />
                <Route path="/crear/evento" component={EventoForm} />

                
                <Route path="/crear/historial/:id" component={EventoForm} />
                <Route path="/crear/propuestas/:id" component={PropuestaForm} />
                <Route path="/politico/:id" exact component={PoliticoDetail} />

                <Route path="/politico/:id/propuesta/:id_propuesta" exact component={PropuestaSeleccionada} />
                <Route path="/politico/:id/evento/:id_evento" exact component={EventoSeleccionado} />
                
                <Route path="/evento/modify/:id_evento" exact component={ModificarEvento} />
                <Route path="/propuesta/modify/:id_propuesta" exact component={ModificarPropuesta} />
                 <Route path="/politico/modify/:id_politico" exact component={ModificarPolitico} />

                 < Route path="/error" exact component={ErrorScreen} />

                {/*Landing page*/}
                <Route path="/" exact component={LandingPage} />
                {/*404 not found*/}
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
