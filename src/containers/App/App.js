import React from 'react';
import ApolloClient from 'apollo-boost';
import styled from 'styled-components';
import { Spin } from 'antd';
import { ApolloProvider } from '@apollo/react-hooks';
import { Route, Switch } from 'react-router-dom';
import { useAuth } from '../../utils/dataStore';
import { GRAPHQL_URI } from '../../utils/config';
import GlobalStyle from '../../styles/global-styles';
import Welcome from '../Welcome/Welcome';
import SignIn from '../../components/Auth/SignIn';
import SignUp from '../../components/Auth/SignUp';
import Profile from '../../components/Profile';
import PrivateRoute from '../../components/PrivateRoute';
import EntryForm from '../EntryForm/EntryForm';
import Moods from '../Moods';
// import Charts from '../Charts';
import ChartsViews from '../../components/ChartViews';
import NotFound from '../NotFound/404';
import Settings from '../Settings';
import styles from '../../styles/theme';

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
    <LoadingWrapper>
      <Spin size="large" />
    </LoadingWrapper>
  ) : (
    <ApolloProvider client={client}>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
          <PrivateRoute path="/entryform" component={EntryForm} />
          <PrivateRoute path="/dashboard/settings" component={Settings} />
          <PrivateRoute path="/dashboard" component={Moods} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <GlobalStyle />
    </ApolloProvider>
  );
}

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .ant-spin-dot-item {
    background-color: ${styles.darkJungleGreen} !important;
  }
`;

export default App;
