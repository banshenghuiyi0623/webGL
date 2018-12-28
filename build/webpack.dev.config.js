const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
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
  module: {
    rules: [{
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