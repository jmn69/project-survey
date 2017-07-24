var path = require('path');
var webpack = require('webpack');
var APP_DIR = path.join(__dirname, '..', 'client');

module.exports = {
    entry: {
        index: ['react-hot-loader/patch', 'webpack-hot-middleware/client', './client/index.jsx']
    },
    output: {
        path: path.join(__dirname, '..', 'public'),
        filename: 'bundle.js',
        publicPath: '/public/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }
                ],
                include: [/flexboxgrid/, APP_DIR]
            },
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ],
                include: APP_DIR
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]'
                    },
                    {
                        loader: 'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                    }
                ],
                include: APP_DIR
            },
            {
                test: /\.(eot|woff)$/,
                use: [
                    {
                        loader: "file-loader"
                    }
                ],
            }
        ]
    },
    resolve: {
        modules: ["node_modules"],
        extensions: ['.js', '.jsx']
    },
    devtool: 'eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /fr/),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        })
    ]
};
