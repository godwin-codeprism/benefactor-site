var path = require('path');

module.exports = {
    entry: "./scripts/imports.js",
    output: {
        path: './',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpg)$/,
                loader: "file-loader?name=assets/[path][name].[ext]"
            },
            {
                test:/\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader?name=assets/[path][name].[ext]"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader?name=assets/[path][name].[ext]"
            }
        ]
    }
}