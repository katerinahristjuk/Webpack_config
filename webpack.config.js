const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development', //znacit sto prilozenie nahoditsja v razrabotke i vihodnie fajlii js ne nado szimat
    entry: ['./src/index.jsx', '@babel/polyfill'], //ishodnij fajl
    output: { //mesto kuda budet sam webpack sobirat fajli
        path: path.resolve(__dirname, 'dist'), //eto papka kuda webpack budet delat sborku
        filename: '[name].[fullhash].js'
    },
    devServer:{
        port: 3000
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx'],
      },
    plugins: [
        new HTMLWebpackPlugin({template: './src/index.html'}),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            { //import stilej
                test: /\.(css|less)$/, //reguljarnie virazenie koorye budut obrabativat ukazanie nami nize loaderi (css i less fajli)
                use: ["style-loader", "css-loader", "less-loader"] //array of loaders
            },
            { //import fajlov
                test: /\.(jpg|jpeg|png|svg)$/,
                use: ["file-loader"]
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
            {
                test: /\.m?jsx$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-react', '@babel/preset-env']
                  }
                }
            },
        ]
    }
}