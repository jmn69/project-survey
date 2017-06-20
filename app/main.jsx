import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Root from './Root.jsx';
import routes from './routes.js';

const renderApp = appRoutes => {
    render(
        <AppContainer>
            <Root routes={appRoutes} />
        </AppContainer>,
        document.getElementById('app')
    );
};

renderApp(routes);

if (module.hot) {
    module.hot.accept('./routes', () => {
        const newRoutes = require('./routes').default;
        renderApp(newRoutes);
    });
}