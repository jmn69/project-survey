import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './App.jsx';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SurveyList from './pages/SurveyList';
import RequireAuthentication from './auth/RequireAuthentication.js';

const routes = () => {
    return (
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="signin" component={SignIn} />
            <Route path="admin" component={RequireAuthentication(Dashboard)} >
                <Route path="surveylist" component={SurveyList} />
            </Route>
        </Route>
    );
};

export default routes;