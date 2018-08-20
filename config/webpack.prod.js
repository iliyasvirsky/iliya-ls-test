const webpack = require('webpack');
const merge = require('webpack-merge');

const helpers = require('./helpers');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  mode: 'production',

  output: {
    filename: 'js/[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  plugins: [
    // minimizer: [
    //   new UglifyJsPlugin({
    // 
    //   })
    // ],
    minimizer: [
        //https://github.com/mishoo/UglifyJS2/tree/harmony
        new UglifyJsPlugin({
            uglifyOptions: {
                output: {
                    comments: false
                },
                minify: {},
                compress: {
                  cache: true,
                  parallel: true,
                  sourceMap: true
                }
            }
        }),
    ]

  ]
});