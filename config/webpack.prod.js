const webpack = require('webpack');
const merge = require('webpack-merge');

const helpers = require('./helpers');
const commonConfig = require('./webpack.common');

// module.exports = merge(commonConfig, {
//   mode: 'production',
// 
//   output: {
//     filename: 'js/[name].[hash].js',
//     chunkFilename: '[id].[hash].chunk.js'
//   },
//   optimization: {
//       minimize: true,
//       runtimeChunk: true,
//       splitChunks: {
//           chunks: "async",
//           minSize: 1000,
//           minChunks: 2,
//           maxAsyncRequests: 5,
//           maxInitialRequests: 3,
//           name: true,
//           cacheGroups: {
//               default: {
//                   minChunks: 1,
//                   priority: -20,
//                   reuseExistingChunk: true,
//               },
//               vendors: {
//                   test: /[\\/]node_modules[\\/]/,
//                   priority: -10
//               }
//           }
//       }
//   }
// 
// });

module.exports = merge(commonConfig, {
  devtool: 'eval-source-map',

  mode: 'production',

  entry: {
    'app': [
      'webpack-hot-middleware/client?reload=true'
    ]
  },

  output: {
    filename: 'js/[name].js',
    chunkFilename: '[id].chunk.js'
  },

  devServer: {
    contentBase: './client/public',
    historyApiFallback: true,
    stats: 'minimal' // none (or false), errors-only, minimal, normal (or true) and verbose
  }
});
