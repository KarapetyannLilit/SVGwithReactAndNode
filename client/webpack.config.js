const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
// C: \Users\Lilit Karapetyan\OneDrive\Рабочий стол\ExpressWithWebpack\public
// filename = "../views/index.html" C:\Users\Lilit Karapetyan\OneDrive\Рабочий стол\ExpressWithWebpack\views
module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: "C:/Users/Lilit Karapetyan/OneDrive/Рабочий стол/ExpressWithWebpack/public",
        filename: "main.js"
    },
    // plugins: [new HtmlWebpackPlugin({
    //     template: './public/index.html',
    //     filename: 'index.html',
    // }),],
    target: "web",
    devtool: 'source-map',
    // devServer: {
    //     devMiddleware: {
    //         writeToDisk: true,
    //     },
    //     port: "9500",
    //     static: ["./public"],
    //     open: true,
    //     hot: true,
    //     liveReload: true
    // },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    }
}
