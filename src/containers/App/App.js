import React, { useEffect, useState } from 'react';
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
import Settings from '../Settings';

function App() {
  const { loading, getTokenSilently } = useAuth0();
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`;
        // console.log('latitude', position.coords.latitude);
        // console.log('longitude', position.coords.longitude);
        const response = await fetch(url);
        const res = await response.json();
        setWeather({
          temp: res.main.temp,
          main: res.weather[0].main,
        });
      });
    }
  }, []);

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
          <Route
            path="/entryform"
            // eslint-disable-next-line react/jsx-props-no-spreading
            render={(props) => <EntryForm {...props} weather={weather} />}
          />
          <Route path="/settings" component={Settings} />
          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
      </div>
      <GlobalStyle />
    </ApolloProvider>
  );
}

export default App;
