var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var autoprefixer = require('autoprefixer')

module.exports = {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/'
  },
  plugins: [
    /**
     * This plugin assigns the module and chunk ids by occurence count. What this
     * means is that frequently used IDs will get lower/shorter IDs - so they become
     * more predictable.
     */
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    /**
     * Some of you might recognize this! It minimizes all your JS output of chunks.
     * Loaders are switched into a minmizing mode. Obviously, you'd only want to run
     * your production code through this!
     */
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false },

      comments: false
    }),
    new ExtractTextPlugin('app.css')
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      include: path.join(__dirname, 'src')
    }, {
      test: /\.json$/,
      loader: 'json',
      include: path.join(__dirname, 'data')
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(
        'style',
        'css?modules&sourceMap&localIdentName=[hash:base64:3]&importLoaders=1!postcss!sass?sourceMap'
      ),
      include: path.join(__dirname, 'src')
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css'),
      include: [
        path.join(__dirname, 'src'),
        path.join(__dirname, 'node_modules', 'normalize.css')
      ]
    }]
  },
  postcss: function () {
    return [ autoprefixer ]
  }
}
