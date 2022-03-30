const webpack = require("webpack");
const path = require("path");

let config = {
  entry: "./src/client/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js"
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: ['react-hot-loader/webpack', 'babel-loader']
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }
    ]
  },
  devServer: {
    compress: true,
    port: 8081,
  },
}

module.exports = config;