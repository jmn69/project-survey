import 'babel-polyfill';
import express from 'express';
import cookieParser from 'cookie-parser';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import clientConfig from '../webpack/client.dev';
import serverConfig from '../webpack/server.dev';
import path from 'path';
import conf from '../config';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
const MongoStore = require('connect-mongo')(session);
import morgan from 'morgan';
import bodyParser from 'body-parser';

const DEV = process.env.NODE_ENV === 'development';
const publicPath = clientConfig.output.publicPath;
const outputPath = clientConfig.output.path;
var users = require('./controllers/user');

var app = express();
var port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var connexion = mongoose.createConnection(conf.connexionString);

app.use(morgan('dev'));

// required for passport
app.use(session({
  secret: conf.session_secret,
  resave: true,
  saveUninitialized: true,
  rolling: true,
  store: new MongoStore({ mongooseConnection: connexion }),
  cookie: { maxAge: 10000, secure: false }
}));

require('../config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// API

app.post("/authentication", users.authentication);

app.get('/authenticate', users.authenticate);

// UNIVERSAL HMR + STATS HANDLING GOODNESS:

if (DEV) {
  const multiCompiler = webpack([clientConfig, serverConfig])
  const clientCompiler = multiCompiler.compilers[0]

  app.use(webpackDevMiddleware(multiCompiler, {
    publicPath,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  }));
  app.use(webpackHotMiddleware(clientCompiler));
  app.use(
    // keeps serverRender updated with arg: { clientStats, outputPath }
    webpackHotServerMiddleware(multiCompiler, {
      serverRendererOptions: { outputPath }
    })
  );
}
else {
  const clientStats = require('../buildClient/stats.json');
  const serverRender = require('../buildServer/main.js').default;

  app.use(publicPath, express.static(outputPath));
  app.use(serverRender({ clientStats, outputPath }));
}

app.listen(port, err => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${port}`);
});