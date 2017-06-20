var path = require('path');
var webpack = require('webpack');
var APP_DIR = path.join(__dirname, '..', 'app');

module.exports = {
    entry: {
        index: ['react-hot-loader/patch', 'webpack-hot-middleware/client', './app/main.jsx']
    },
    output: {
        path: path.join(__dirname, '..', 'public'),
        filename: 'bundle.js',
        publicPath: '/public/'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!css?modules',
                include: [/flexboxgrid/, APP_DIR],
            },
            {
                test: /\.(js|jsx)$/,
                loaders: ['babel'],
                include: APP_DIR
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            },
            { test: /\.(eot|woff)$/, loader: "file-loader" }
        ]
    },
    resolveLoader: { root: path.join(__dirname, "node_modules") },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    debug: true,
    devtool: 'eval-source-map',
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /fr/),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        })
    ]
};
