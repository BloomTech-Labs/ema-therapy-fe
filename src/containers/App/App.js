import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { Route, Switch } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { useAuth0 } from '../../react-auth0-spa';
import Profile from '../../components/Profile';
import PrivateRoute from '../../components/PrivateRoute';
import MoodDisplay from '../../components/MoodDisplay';
import { GRAPHQL_URI } from '../../utils/config';

function App() {
  const { loading, getTokenSilently, isAuthenticated } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

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

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header>
          <NavBar />
        </header>
        {isAuthenticated && <MoodDisplay />}
        <Switch>
          <Route path="/" exact />
          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
      </div>
    </ApolloProvider>
  );
}

export default App;
