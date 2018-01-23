import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Apollo configuration object options
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

//Sin manejo de informacion
import NotFound from './components/not_found';
import LandingPage from './components/landing_page';


//Genericos
import Footer from './components/generic/footer';
import Navbar from './components/generic/navbar';

import SignUp from './components/signup';
import Login from './components/login';
//import ConfirmEmail from './components/confirm_ email';
import RecoverPassword from './components/recover_password';
//import ConfigCuenta from './components/ConfigCuenta/ConfigCuentaForm';

import Elecciones from './components/elecciones/elecciones';
import AcercaDe from './components/acerca_de/acerca_de';
import Politicos from './components/politico/politicos';

import PoliticoForm from './components/politico/politico_create/politico_form';
import PropuestaForm from './components/politico/politico_create/propuesta_form';
import EventoForm from './components/politico/politico_create/evento_form';


const link = createHttpLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'include'
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  dataIdFromObject: o => o.id
});

class App extends React.Component {
  render() {
    // npm run-script dev
    // npm run-script build
    // npm start
    return (
      <ApolloProvider client={client} >
        <BrowserRouter>
          <div>
            <Navbar />
            <Switch>
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              {/*<Route path="/confirm_email" component={ConfirmEmail} />*/}
              <Route path="/recover_password" component={RecoverPassword} />
              {/*<Route path="/config_cuenta" component={ConfigCuenta} />*/}

              <Route path="/elecciones" component={Elecciones} />
              <Route path="/acerca_de" component={AcercaDe} />
              <Route path="/politicos" component={Politicos} />
              
              <Route path="/crear/politico" component={PoliticoForm} />
              <Route path="/crear/propuesta" component={PropuestaForm} />
              <Route path="/crear/evento" component={EventoForm} />

              {/*Landing page*/}
              <Route path="/" exact component={LandingPage} />
              {/*404 not found*/}
              <Route component={NotFound} />
            </Switch>
            <Footer />
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
