import React, { useState, useEffect } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { Route, Switch } from 'react-router-dom';
import { useAuth0 } from '../../utils/react-auth0-spa';
import { GRAPHQL_URI } from '../../utils/config';
import GlobalStyle from '../../styles/global-styles';
import convertTemp from '../../utils/convertTemp';
import Welcome from '../Welcome/Welcome';
import Profile from '../../components/Profile';
import PrivateRoute from '../../components/PrivateRoute';
import EntryForm from '../EntryForm/EntryForm';
import Moods from '../Moods';
import NotFound from '../NotFound/404';
import Settings from '../Settings';

function App() {
  const { loading, getTokenSilently } = useAuth0();
  const [weather, setWeather] = useState(null);

  /*
    Gets the user's location using the Geolocation API
    This should probably be moved to the mood entry form and run onSubmit
    Relies on a REACT_APP_OPEN_WEATHER_API_KEY env variable
  */
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        // addå REACT_APP_OPEN_WEATHER_API_KEY to .env
        const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`;
        const response = await fetch(url);
        const res = await response.json();
        // convert the temp from kelvin to fahrenheit
        const temp = convertTemp(res.main.temp);
        setWeather(`${res.weather[0].main} ${temp}°`);
      });
    }
  }, []);

  // console.log(weather);

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
          <Route path="/" exact component={Welcome} />
          <Route
            path="/entryform"
            // eslint-disable-next-line react/jsx-props-no-spreading
            render={(props) => <EntryForm {...props} weather={weather} />}
          />
          <Route path="/dashboard" exact component={Moods} />
          <Route path="/dashboard/moods" component={Moods} />
          <Route path="/dashboard/settings" component={Settings} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <GlobalStyle />
    </ApolloProvider>
  );
}

export default App;
