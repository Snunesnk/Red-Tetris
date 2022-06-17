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
      loader: "react-hot-loader/webpack"
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }
    ]
  },
  devServer: {
    compress: true,
    port: process.env.PORT || 3024,
  },
}

module.exports = config;