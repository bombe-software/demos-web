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
import { createUploadLink } from 'apollo-upload-client';

//Sin manejo de informacion
import NotFound from './components/not_found';
import LandingPage from './components/landing_page';


//Genericos
import Footer from './components/generic/footer';
import Navbar from './components/generic/navbar';

import SignUp from './components/signup';
import Login from './components/login';

{/*import ConfirmEmail from './components/confirm_ email';*/}
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

//Pruebas 

// Crear un http link
const httpLink = createHttpLink({
  uri: 'https://demos-gql.herokuapp.com/graphql',
  credentials: 'include'
});

// Crear el web socket link
const wsLink = new WebSocketLink({
  uri: `wss://demos-gql.herokuapp.com/subscriptions`,
  options: {
    reconnect: true
  },
  credentials: 'include'
});
 
const uploadLink = createUploadLink({
  uri: 'https://demos-gql.herokuapp.com/graphql',
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
              {/*<Route path="/confirm_email" component={ConfirmEmail} />*/}
              <Route path="/recover_password" component={RecoverPassword} />
              <Route path="/config_cuenta" component={ConfigCuenta} />

              <Route path="/elecciones" component={Elecciones} />
              <Route path="/acerca_de" component={AcercaDe} />
              <Route path="/politicos" component={Politicos} />
              <Route path="/moderador" component={Moderador} />
             
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
