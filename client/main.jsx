import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';

import Root from './Root.jsx';
import routes from './routes.js';
import rootReducer from './reducer';

const initialState = {app: {loggedIn: true, currentURL: ""}};
const loggerMiddleware = createLogger();
const store = createStore(rootReducer, initialState, applyMiddleware(thunkMiddleware, loggerMiddleware));

const renderApp = appRoutes => {
    render(
        <Provider store={store}>
            <AppContainer>
                <Root routes={appRoutes} />
            </AppContainer>
        </Provider>,
        document.getElementById('app')
    );
};

renderApp(routes);

if (module.hot) {
    module.hot.accept('./routes', () => {
        const newRoutes = require('./routes').default;
        renderApp(newRoutes);
    });

    module.hot.accept('./reducer', () => {
        const nextReducer = require('./reducer').default;
        store.replaceReducer(nextReducer);
    });
}