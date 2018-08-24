// const webpack = require('webpack');
// const merge = require('webpack-merge');
// 
// const helpers = require('./helpers');
// const commonConfig = require('./webpack.common');
// 
// 
// module.exports = merge(commonConfig, {
//   devtool: 'eval-source-map',
// 
//   mode: 'production',
// 
//   entry: {
//     'app': [
//       'webpack-hot-middleware/client?reload=true'
//     ]
//   },
// 
//   output: {
//     filename: 'js/[name].js',
//     chunkFilename: '[id].chunk.js'
//   },
// 
//   devServer: {
//     contentBase: './client/public',
//     historyApiFallback: true,
//     stats: 'minimal' // none (or false), errors-only, minimal, normal (or true) and verbose
//   }
// });
const path = require('path')  
const webpack = require('webpack')

export default {  
  devtool: 'source-map',
  mode: 'production',

  entry: [
    './src/index'
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],

  module: {
    loaders: [
      { test: /\.js?$/,
        loader: 'babel',
        exclude: /node_modules/ },
      { test: /\.scss?$/,
        loader: 'style!css!sass',
        include: path.join(__dirname, 'src', 'styles') },
      { test: /\.png$/,
        loader: 'file' },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file'}
    ]
  }
}