import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {createLogger} from 'redux-logger';
import {MuiThemeProvider} from 'material-ui/styles';

import Root from './Root.jsx';
import routes from './routes.js';
import rootReducer from './rootReducer';

const initialState = {auth: {loggedIn: false, currentURL: "", isFetching: false}};
const loggerMiddleware = createLogger();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(thunkMiddleware, loggerMiddleware)
));

const renderApp = appRoutes => {
    render(
        <Provider store={store}>
            <MuiThemeProvider>
                <AppContainer>
                    <Root routes={appRoutes} />
                </AppContainer>
            </MuiThemeProvider>
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

    module.hot.accept('./rootReducer', () => {
        const nextReducer = require('./rootReducer').default;
        store.replaceReducer(nextReducer);
    });
}