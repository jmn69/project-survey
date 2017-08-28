import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';

import configureStore from './configureStore';
import App from './components/App';

require("font-awesome-sass-loader");

const history = createHistory();
const { store } = configureStore(history, window.REDUX_STATE)

const render = App => {
    const root = document.getElementById('app');

    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <App />
            </Provider>
        </AppContainer>,
        root
    );
};

render(App);

if (module.hot && process.env.NODE_ENV === 'development') {
    module.hot.accept('./components/App', () => {
        const App = require('./components/App').default;
        render(App);
    });
}