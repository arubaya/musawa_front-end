import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import Cookies from 'js-cookie';

import Home from '../views/pages/Home';
import NavigationBar from '../views/components/NavigationBar';
import Footer from '../views/components/Footer';
import Login from '../views/pages/Login';
import Admin from '../views/pages/Admin';
import User from '../views/pages/User';

import Authenticated from '../middleware/Authenticated';
import ProtectedRoute from '../middleware/ProtectedRoute';
import Register from '../views/pages/Register';

function Router() {
  return (
    <Switch>
      <Route exact path="/">
        <Authenticated>
          <NavigationBar />
          <Home />
          <Footer />
        </Authenticated>
      </Route>
      <Route path="/admin">
        <ProtectedRoute>
          <NavigationBar />
          <Admin />
          <Footer />
        </ProtectedRoute>
      </Route>
      <Route path="/user">
        <ProtectedRoute>
          <NavigationBar />
          <User />
          <Footer />
        </ProtectedRoute>
      </Route>
      <Route exact path="/login">
        <Authenticated>
          <Login />
        </Authenticated>
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
    </Switch>
  );
}

export default Router;
