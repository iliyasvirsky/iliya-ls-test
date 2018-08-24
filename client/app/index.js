import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import NotFound from './components/App/NotFound';

import Home from './components/Home/Home';
import Login from './components/Home/Login';

import Users from './components/Users/Users';
import User from './components/Users/User';

import './styles/styles.scss';

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/users" component={Users}/>
        <Route exact path="/user/:id" component={User}/>
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
