import React from 'react';
import NavBar from '../../components/NavBar';
import { useAuth0 } from '../../react-auth0-spa';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Profile from '../../components/Profile';
import PrivateRoute from '../../components/PrivateRoute';

function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route path="/" exact />
          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
