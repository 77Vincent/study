const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackConfigBase = require('./webpack.base.config');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const PORT = 3000;
function resolve(relatedPath) {
  return path.join(__dirname, relatedPath);
}
const webpackConfigDev = {
  plugins: [
    // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      IS_DEVELOPMETN: true,
    }),
    new OpenBrowserPlugin({
      url: `http://localhost:${PORT}`,
    }),
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: resolve('../app'),
    historyApiFallback: false,
    port: PORT,
    hot: false,
    stats: { colors: true },    
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
};

module.exports = merge(webpackConfigBase, webpackConfigDev);
