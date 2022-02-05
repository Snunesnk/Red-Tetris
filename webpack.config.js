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
      test: /\.js$/,
      exclude: /node_modules/,
      use: "babel-loader"
    }]
  }
}

module.exports = config;