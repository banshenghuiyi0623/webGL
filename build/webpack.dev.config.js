const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'index.js'
  },
  mode: 'development',
  devtool: '#cheap-module-eval-source-map',
  devServer: {
    hot: true,
    port: 9000
    // disableHoseCheck: true
  },
  resolve: {
    extensions: [' ', '.js', '.json', '.jsx', '.scss'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      src: resolve('src'),
      components: resolve('src/components'),
      assets: resolve('src/assets'),
      libs: resolve('src/libs'),
      api: resolve('src/api'),
      shaders: resolve('src/shaders')
    }
  },
  module: {
    rules: [{
        test: /\.(png|je?pg|svg|gif)$/i,
        use: {
          loader: 'url-loader',
          options: {
            name: 'static/[name].[hash].[ext]',
            limit: 2000
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }]
        })
      },
      {
        test: /\.(css|scss|less)/i,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      },
      {
        test: /\.js$/i,
        use: ['babel-loader'],
        exclude: /node_modules/
      }, {
        test: /\.glsl$/,
        loader: 'raw-loader'
      }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'template.html',
      inject: ['body', 'head']
    })
  ]
}