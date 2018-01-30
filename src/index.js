import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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

import Moderador from './components/moderador/moderador';

//Pruebas 


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
                <Route path="/politico/:id" component={PoliticoDetail} />


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
