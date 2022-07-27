const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    'get-spaces-photo': './src/get-spaces-photo.js',
    'sign-up': './src/sign-up.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    libraryTarget: 'commonjs',
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },
  stats: {
    colors: true,
  },
  target: 'web',
  externals: /^(k6|https?\:\/\/)(\/.*)?/,
  devtool: 'source-map',
  optimization: {
    usedExports: true,
  },
};
