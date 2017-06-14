const HtmlWebpackPlugin = require('html-webpack-plugin');
const jQuery = require('jquery');

const path = require('path');

const merge = require('webpack-merge');

const Parts = require('./webpack.parts');
const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist')
};

const Common = merge([
  {
    context: PATHS.src,
    entry: {
      materialize: 'materialize-loader!../materialize.config.js',
      main: './index.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: PATHS.dist
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: [path.join(__dirname, 'src')],

          exclude: /node_modules/,

          use: 'babel-loader'
        }
      ]
    },
    resolve: {
      alias: {
        jquery: "jquery/src/jquery"
      }
    },
    plugins: [
      new HtmlWebpackPlugin({ template: path.join(PATHS.src, 'index.html') })
    ]
  }
])

module.exports = function (env) {
  if (env === 'production') {
    return merge([
      Common,
      Parts.lintJS({ paths: PATHS.src }),
      Parts.CSS(env),
      Parts.matLoader(env)
    ])
  }

  return merge([
    Common,
    Parts.devServer({
      host: process.env.HOST,
      port: process.env.PORT
    }),
    Parts.lintJS({
      paths: PATHS.src,
      options: {
        emitWarning: true
      }
    }),
    Parts.matLoader(env),
    Parts.CSS(env)
  ])
}
