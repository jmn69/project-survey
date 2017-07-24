import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from 'material-ui/styles';

import App from './App';

export default function Root({ store, theme }) {
  return (
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </MuiThemeProvider>
    </Provider>
  );
}