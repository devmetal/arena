const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';

const plugins = [
  new HtmlWebpackPlugin({
    template: 'src/client/index.html'
  }),
];

if (!isDev) {
  plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin(),
  );
}

module.exports = {
  entry: './src/client/index.js',
  
  output: {
    path: path.join(__dirname, 'src', 'client', 'build'),
    filename: 'bundle.js',
  },
  
  devtool: 'sourcemap',
  
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.jsx?$/,
        exclude: /node_modules/,
      }
    ],
  },
  
  resolve: {
    extensions: ['.js', 'jsx'],
  },
  
  plugins,
}
