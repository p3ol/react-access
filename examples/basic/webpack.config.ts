import path from 'node:path';

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config: webpack.Configuration = {
  entry: {
    example: path.resolve(__dirname, './index.tsx'),
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
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '@poool/react-access': path.resolve(__dirname, '../../src'),
    },
  },
  module: {
    rules: [{
      test: /\.m?[j|t]sx?/,
      exclude: /node_modules/,
      use: [{
        loader: 'swc-loader',
        options: {
          jsc: {
            transform: {
              react: {
                runtime: 'automatic',
              },
            },
            parser: {
              syntax: 'typescript',
              tsx: true,
            },
          },
        },
      }],
    }],
  },
};

export default config;
