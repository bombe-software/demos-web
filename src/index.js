import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Apollo configuration object options
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

//Demos components
import NotFound from './components/NotFound';
import LandingPage from './components/LandingPage';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import EmailConfirmation from './components/EmailConfirmation';
import RecoverPassword from './components/RecoverPassword';
import NuevoPolitico from './components/politico/NuevoPolitico';
import AcercaDe from './components/acerca_de/acerca_de';
import NuevaPropuesta from './components/politico/NuevaPropuesta';
import NuevoEvento from './components/politico/NuevoEvento';
import ConfigCuenta from './components/ConfigCuenta/ConfigCuentaForm';
import Politicos from './components/politico/politicos';
import Elecciones from './components/elecciones/elecciones';

import Footer from './components/generic/Footer';
import Navbar from './components/generic/Navbar';

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
              <Route exact path="/" component={LandingPage} />

              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/email-confirmation" component={EmailConfirmation} />
              <Route exact path="/recover-password" component={RecoverPassword} />
              <Route exact path="/politicos/nuevo" component={NuevoPolitico} />
              <Route exact path="/politicos/propuesta" component={NuevaPropuesta} />
              <Route exact path="/politicos/evento" component={NuevoEvento} />
              <Route exact path="/config-cuenta" component={ConfigCuenta} />
              <Route exact path="/politicos" component={Politicos} />
              <Route path="/elecciones" component={Elecciones} /> 
              <Route path="/acerca-de" component={AcercaDe} /> 
              
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
