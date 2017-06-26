var path = require('path');
var express = require('express');
var conf = require('./config');

var app = express();
var port = process.env.PORT || 3000;

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