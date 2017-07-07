var path = require('path');
var express = require('express');
var conf = require('./config');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var morgan = require('morgan');
var bodyParser = require( 'body-parser' );

var users = require('./server/controllers/user');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

console.log(conf.connexionString);
mongoose.createConnection(conf.connexionString);

require('./config/passport')(passport); // pass passport for configuration

app.use(morgan('dev')); // log every request to the console

// required for passport
app.use(session({ secret: conf.session_secret })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

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
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.post("/login", users.login)

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