import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './App.jsx';
import Home from './pages/Home';

const routes = () => {
    return (
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
        </Route>
    );
};

export default routes;