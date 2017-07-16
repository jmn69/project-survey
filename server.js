var path = require('path');
var express = require('express');
var conf = require('./config');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var users = require('./server/controllers/user');

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
  cookie: { maxAge: 60000, secure: false }
}));

require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === 'production') {
  const publicPath = express.static(path.join(__dirname, 'public'))
  app.use('/public', publicPath)

}
else {
  var webpack = require('webpack');
  var config = require('./config/webpack.dev');
  var compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.post("/authentication", users.authentication);

app.get('/authenticate', users.authenticate);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, err => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${port}`);
});