import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './App.jsx';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import SurveyList from './pages/SurveyList';
import EnsureLoggedInContainer from './EnsureLoggedInContainer.js';

function loggedIn() {
  return true;
}

function requireAuth(nextState, replace) {
  if (!loggedIn()) {
    replace({
      pathname: '/login'
    })
  }
}

const routes = () => {
    return (
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="login" component={Login} />
            <Route path="admin" component={EnsureLoggedInContainer} >
                <IndexRoute component={Dashboard} />
                <Route path="surveylist" component={SurveyList} />
            </Route> 
        </Route>
    );
};

export default routes;