import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import { configureStore } from './store/configureStore';
import theme from './muiTheme';
import App from './App';
import Root from './Root';

const initialState = { auth: { loggedIn: false, currentURL: "", isFetching: false } };
const store = configureStore(initialState);

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component store={store} theme={theme} />
        </AppContainer>,
        document.getElementById('app')
    )
}

render(Root);

if (module.hot) {
    module.hot.accept(() => { render(Root) })
    module.hot.accept('./rootReducer', () => {
        const nextReducer = require('./rootReducer').default;
        store.replaceReducer(nextReducer);
    });
}