import React from 'react';
import NavBar from '../../components/NavBar';
import { useAuth0 } from '../../react-auth0-spa';
import { Route, Switch } from 'react-router-dom';
import Profile from '../../components/Profile';
import PrivateRoute from '../../components/PrivateRoute';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import MoodDisplay from '../../components/MoodDisplay';

function App() {
  const { loading, getTokenSilently, user, isAuthenticated } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  const client = new ApolloClient({
    // uri: 'https://moodmuse.herokuapp.com/backend',
    uri: 'http://localhost:5000/backend',
    request: async (operation) => {
      const token = await getTokenSilently();
      console.log('token: ', token);
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
        {isAuthenticated && <MoodDisplay sub={user.sub} />}
        <Switch>
          <Route path="/" exact />
          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
      </div>
    </ApolloProvider>
  );
}

export default App;
