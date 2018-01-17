import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Apollo configuration object options
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

//Demos components
import NotFound from './components/NotFound';
import LandingPage from './components/LandingPage';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import EmailConfirmation from './components/EmailConfirmation';
import RecoverPassword from './components/RecoverPassword';

import Footer from './components/generic/Footer';
import Navbar from './components/generic/Navbar';

const link = createHttpLink({
  uri: 'https://demos-gql.herokuapp.com/graphql',
  credentials: 'include'
});

const client = new ApolloClient({
  dataIdFromObject: o => o.id,
  cache: new InMemoryCache(),
  link,
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
