// const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.devServer = function (options) {
  return {
    devServer: {
      host: options.host,
      port: options.port,
      inline: true,
      stats: 'errors-only'
    }
  }
}

exports.matLoader = function(env){
    return {
      module: {
        /* entry: {
          materialize: 'materialize-loader!../materialize.config.js',
        }, */
        rules: [
          {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader?limit=10000&mimetype=application/font-woff'
          },
          {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader'
          }
        ]
      }
    }
}

exports.lintJS = function ({ paths, options }) {
  return {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: paths,
          exclude: /node_modules/,
          enforce: 'pre',
          use: [
            {
              loader: 'eslint-loader',
              options: options
            }
          ]
        }
      ]
    }
  }
}

exports.CSS = function (env) {
  if (env === 'production') {
    return {
      module: {
        rules: [
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              use: {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  modules: true,
                  localIdentName: '[path][name]__[local]--[hash:base64:5]'
                }
              }
            })
          }
        ]
      },
      plugins: [
        new ExtractTextPlugin({
          filename: '[name].css',
          allChunks: true
        })
      ]
    }
  }

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
              }
            }
          ]
        }
      ]
    }
  }
}
