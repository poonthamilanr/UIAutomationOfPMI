const path = require('path');
const env = require('@babel/preset-env');
const reactApp = require('babel-preset-react-app');
// Webpack build configuration to build the SSR bundle.
// Invoked by build:server.

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, './server.js'),
  target: 'node',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '../build/server.bundle.js',
    libraryTarget: 'this',
  },
  optimization: {
    minimize: false,
  },
  module: {
    noParse: /iconv-loader\.js/,
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [env, reactApp],
          },
        },
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: { loader: 'html-loader' },
      },
      {
        // anything not JS or HTML, we load as a URL
        // this makes static image imports work with SSR
        test: /\.(?!js|mjs|jsx|html|graphql$)[^.]+$/,
        exclude: /node_modules/,
        use: {
          loader: 'url-loader',
        },
      },
      {
        // anything in node_modules that isn't js,
        // we load as null - e.g. imported css from a module,
        // that is not needed for SSR
        test: /\.(?!js|mjs|jsx|html|graphql$)[^.]+$/,
        include: /node_modules/,
        use: {
          loader: 'null-loader',
        },
      },
    ],
  },
  resolve: {
    alias: {
      foundation: path.resolve(__dirname, '../Foundation'),
      feature: path.resolve(__dirname, '../Feature'),
      assets: path.resolve(__dirname, '../Project/Certification/client/assets'),
      project: path.resolve(__dirname, '../Project')
    }
  },
};
