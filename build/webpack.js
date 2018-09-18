var path = require('path');
var webpack = require('webpack');
var ionicWebpackFactory = require(process.env.IONIC_WEBPACK_FACTORY);
var deepExtend = require('deep-extend');
var cordovaLib = require('cordova').cordova_lib;
var CSON = require('cson');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ModuleConcatPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');

var defaultConfig = CSON.requireFile('./src/config.default.cson');
var configOverwrite = CSON.requireFile('./config/config.cson');

const RawConfig = deepExtend(defaultConfig, configOverwrite);

var prodPlugins = [];
if (process.env.IONIC_ENV === 'prod') {
  prodPlugins.push(new ModuleConcatPlugin());
}

const webpackConfig = {
  entry: process.env.IONIC_APP_ENTRY_POINT,
  output: {
    path: '{{BUILD}}',
    publicPath: 'build/',
    filename: '[name].js',
    devtoolModuleFilenameTemplate: ionicWebpackFactory.getSourceMapperFunction(),
  },
  devtool: process.env.IONIC_SOURCE_MAP_TYPE,

  resolve: {
    extensions: ['.ts', '.js', '.json', '.cson'],
    modules: [path.resolve('node_modules')]
  },

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.cson$/,
        use: [
          `file-loader?name=i18n/[name].json&publicPath=i18n&outputPath=${process.env.IONIC_WWW_DIR}&useRelativePath=true`,
          'strip-module-export-loader',
          'cson-loader'
        ],
        include: path.join(__dirname, '..', 'src', 'i18n')
      },
      {
        test: /\.cson$/,
        use: 'cson-loader',
        exclude: path.join(__dirname, '..', 'src', 'i18n')
      },
      {
        test: /\.ts$/,
        loader: process.env.IONIC_WEBPACK_LOADER
      },
      {
        test: /\.js$/,
        loader: process.env.IONIC_WEBPACK_TRANSPILE_LOADER
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(getAppVersion()),
      __DEV__: process.env.IONIC_ENV === 'dev',
      __PROD__: process.env.IONIC_ENV === 'prod',
      __SW_ENABLED__: JSON.stringify(RawConfig.serviceWorker.enabled),
      __CONFIG_FOLDER__: JSON.stringify(process.env.IONIC_ROOT_DIR + '/config'),
    }),
    ionicWebpackFactory.getIonicEnvironmentPlugin(),
    ionicWebpackFactory.getCommonChunksPlugin(),
    new webpack.ContextReplacementPlugin(/moment\/locale$/, getRegexAutorizedLanguages()),
    new HtmlWebpackPlugin({
      filename: process.env.IONIC_WWW_DIR + '/index.html',
      config: RawConfig,
      template: path.join(__dirname, '..', 'config', 'index.ejs'),
    })
  ].concat(prodPlugins),

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};

module.exports = {
  dev: webpackConfig,
  prod: webpackConfig
}

function getRegexAutorizedLanguages() {
  return new RegExp(RawConfig.language.imported.join('|'));
}

function getAppVersion() {
  var config = new cordovaLib.configparser(path.join(__dirname, '..', 'config.xml'));
  return config.version();
}