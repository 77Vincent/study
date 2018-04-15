const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')

const PORT = 3000

const webpackConfigDev = {
  plugins: [
    // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      IS_DEVELOPMETN: true,
    })
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve('./app'),
    historyApiFallback: false,
    port: PORT,
    host: '0.0.0.0',
    hot: false,
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: false,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: false,
      warnings: false,
      publicPath: false
    },  
    proxy: {
      '/': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
}

module.exports = merge(webpackConfigBase, webpackConfigDev)
