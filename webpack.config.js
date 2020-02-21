const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [
      new HtmlWebpackPlugin({
          template: "./src/index.html",
          filename: "index.html",
      }),
      new MiniCssExtractPlugin({
          filename:'style.css',
      }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, "css-loader",
        ],
      },
    ]
  }
}