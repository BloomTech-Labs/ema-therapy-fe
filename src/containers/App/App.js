import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { Route, Switch } from 'react-router-dom';
import { useAuth } from '../../utils/dataStore';
import { GRAPHQL_URI } from '../../utils/config';
import GlobalStyle from '../../styles/global-styles';
import SignIn from '../../components/Auth/SignIn';
import SignUp from '../../components/Auth/SignUp';
import DailyTask from '../../components/DailyTask';
import PrivateRoute from '../../components/PrivateRoute';
import EntryForm from '../EntryForm/EntryForm';
import Moods from '../Moods';
import ChartViews from '../../components/ChartViews';
import NotFound from '../NotFound/404';
import Settings from '../Settings';
import ExportPdf from '../ExportPdf/ExportPdf';
import LoadingSpinner from '../../components/LoadingSpinner';
import Tasks from '../Tasks';
import Welcome from '../Welcome/Welcome';
import DesktopNotification from '../../components/DesktopNotification';

function App() {
  const { loading } = useAuth();

  const client = new ApolloClient({
    uri: GRAPHQL_URI,
    request: async (operation) => {
      const { token } = localStorage;
      operation.setContext({
        headers: {
          authorization: token ? `${token}` : '',
        },
      });
    },
  });

  return loading ? (
    <LoadingSpinner height="100vh" />
  ) : (
    <ApolloProvider client={client}>
      <div className="App">
        <DesktopNotification />
        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
          <PrivateRoute path="/entryform" component={EntryForm} />
          <PrivateRoute path="/dashboard/settings" component={Settings} />
          <PrivateRoute path="/dashboard/charts" component={ChartViews} />
          <PrivateRoute path="/dashboard/tasks" exact component={Tasks} />
          <PrivateRoute path="/dashboard/tasks/:task" component={DailyTask} />
          <PrivateRoute path="/dashboard" component={Moods} />
          <PrivateRoute path="/exportpdf" component={ExportPdf} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <GlobalStyle />
    </ApolloProvider>
  );
}

export default App;
