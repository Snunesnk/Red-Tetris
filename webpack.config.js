const webpack = require("webpack");
const path = require("path");

let config = {
  entry: "./src/client/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
    // publicPath: '/public/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "react-hot-loader/webpack",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  devServer: {
    compress: true,
    port: 3024,
  },
  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: {
          PORT: process.env.PORT || 3042,
          API_URL: process.env.API_URL || "http://localhost:3042",
        },
      },
    }),
  ],
};

module.exports = config;
