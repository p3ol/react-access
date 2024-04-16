const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    example: path.resolve(__dirname, './index.js'),
  },
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    open: process.env.NODE_ENV !== 'test',
    hot: true,
    port: process.env.TEST_PORT || 63000,
    host: 'localhost',
    historyApiFallback: true,
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
      chunks: ['example'],
      inject: true,
    }),
  ],
  resolve: {
    extensions: ['.js'],
    alias: {
      '@poool/react-access': path.resolve(__dirname, '../../src'),
    },
  },
  module: {
    rules: [{
      test: /\.js/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
      }],
    }],
  },
};
