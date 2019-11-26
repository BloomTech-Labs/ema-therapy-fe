// import React, { useState, useEffect } from 'react';
import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { Route, Switch } from 'react-router-dom';
import { useAuth0 } from '../../utils/react-auth0-spa';
import { GRAPHQL_URI } from '../../utils/config';
import GlobalStyle from '../../styles/global-styles';
// import convertTemp from '../../utils/convertTemp';
import Welcome from '../Welcome/Welcome';
import Profile from '../../components/Profile';
import PrivateRoute from '../../components/PrivateRoute';
import EntryForm from '../EntryForm/EntryForm';
import Moods from '../Moods';
import NotFound from '../NotFound/404';
import Settings from '../Settings';
import SingleDay from '../SingleDay';
import { MoodsPrevWeekProvider } from '../../contexts/MoodsPrevWeekContext';

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
      <MoodsPrevWeekProvider>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Welcome} />
            <Route path="/entryform" component={EntryForm} />
            <Route path="/dashboard" exact component={Moods} />
            <Route path="/dashboard/moods" component={Moods} />
            <Route path="/dashboard/day/:day" component={SingleDay} />
            <Route path="/dashboard/settings" component={Settings} />
            <PrivateRoute path="/profile" component={Profile} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <GlobalStyle />
      </MoodsPrevWeekProvider>
    </ApolloProvider>
  );
}

export default App;
