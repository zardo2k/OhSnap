var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
  devtool: "source-map",
  entry: {
    background: APP_DIR + '/background.jsx',
    inject: APP_DIR + '/inject.jsx',
    popup: APP_DIR + '/popup.jsx'
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].js',
    sourceMapFilename: "[file].map",
    publicPath: "/build/"
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
      }
    ]
  }
};

module.exports = config;
