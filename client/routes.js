import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './App.jsx';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SurveyList from './pages/SurveyList';
import AdminArea from './pages/AdminArea';
import RequireAuthentication from './auth/RequireAuthentication.js';

const routes = () => {
    return (
        <Route path="/" component={App}>
            <Route component={RequireAuthentication(AdminArea)}>
                <IndexRoute component={Dashboard} />
                <Route path="surveylist" component={SurveyList} />
            </Route>
            <Route path="signin" component={SignIn} />
        </Route>
    );
};

export default routes;