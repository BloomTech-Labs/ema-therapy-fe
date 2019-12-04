import React, { useEffect } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';
import { Route, Switch } from 'react-router-dom';
import { useAuth0 } from '../../utils/react-auth0-spa';
import { GRAPHQL_URI } from '../../utils/config';
import GlobalStyle from '../../styles/global-styles';
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
  const history = createBrowserHistory();

  useEffect(() => {
    // sends pageview hit to GA when path changes
    const unlisten = history.listen((location) =>
      ReactGA.pageview(location.pathname),
    );
    // cleanup
    return () => unlisten();
  }, [history]);

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
            <PrivateRoute path="/entryform" component={EntryForm} />
            <PrivateRoute path="/dashboard" exact component={Moods} />
            <PrivateRoute path="/dashboard/moods" component={Moods} />
            <PrivateRoute path="/dashboard/day/:day" component={SingleDay} />
            <PrivateRoute path="/dashboard/settings" component={Settings} />
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
