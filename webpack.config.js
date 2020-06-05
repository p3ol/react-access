const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    examples: './examples/index.js',
  },
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    open: process.env.NODE_ENV !== 'test',
    hot: true,
    contentBase: './dist',
    port: 63000,
    host: 'localhost',
    historyApiFallback: true,
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new HtmlWebpackPlugin({
      template: './examples/index.html',
      chunks: ['examples'],
      inject: true,
    }),
  ],
  resolve: {
    extensions: ['.js'],
    alias: {
      '@poool/react-access': path.resolve('./src'),
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
