import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

import configureStore from './configureStore';
import App from '../client/components/App';

export default ({ clientStats }) => async (req, res, next) => {
  const store = await configureStore(req, res);
  if (!store) return; // no store means redirect was already served
  const app = createApp(App, store);
  let appString = null;
  try {
    appString = ReactDOM.renderToString(app);
  }
  catch (err) {
    next(err);
  }
  const stateJson = JSON.stringify(store.getState());
  const chunkNames = flushChunkNames();
  const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames });

  console.log('REQUESTED PATH:', req.path);
  console.log('CHUNK NAMES', chunkNames);
  console.log('assetbychunkname', clientStats.assetsByChunkName);

  return res.send(
    `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <title>project-survey</title>
          <link rel="stylesheet" href="https://bootswatch.com/4-alpha/flatly/bootstrap.min.css">
          ${styles}
        </head>
        <body>
          <script>window.REDUX_STATE = ${stateJson}</script>
          <div id="app">${appString}</div>
          ${cssHash}
          <script type='text/javascript' src='/public/vendor.js'></script>
          ${js}
        </body>
      </html>`
  )
}

const createApp = (App, store) =>
  <Provider store={store}>
    <App />
  </Provider>
