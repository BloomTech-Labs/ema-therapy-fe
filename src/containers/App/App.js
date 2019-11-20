import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { Route, Switch } from 'react-router-dom';
import { useAuth0 } from '../../utils/react-auth0-spa';
import { GRAPHQL_URI } from '../../utils/config';
import NavBar from '../../components/NavBar';
import Profile from '../../components/Profile';
import PrivateRoute from '../../components/PrivateRoute';
import GlobalStyle from '../../styles/global-styles';
import Dashboard from '../Dashboard';
import EntryForm from '../EntryForm/EntryForm';

function App() {
  const { loading, getTokenSilently } = useAuth0();

  const client = new ApolloClient({
    uri: GRAPHQL_URI,
    request: async (operation) => {
      const token = await getTokenSilently();
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : '',
        },
      });
    },
  });

  return loading ? (
    <p>Loading...</p>
  ) : (
    <ApolloProvider client={client}>
      <div className="App">
        <Switch>
          <Route path="/" exact component={NavBar} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/entryform" component={EntryForm} />
          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
      </div>
      <GlobalStyle />
    </ApolloProvider>
  );
}

export default App;
