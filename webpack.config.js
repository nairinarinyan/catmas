const webpack = require('webpack');

module.exports = {
    entry: './js/index.js',
    output: {
        path: './build',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin()
    ]
};