const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.resolve('./theme.less'), 'utf8'));

// Hit: use path.resolve without the first parameter, usually '__dirname'
// the absolution path will be based on the excution context,
// which is ./client in here, so the relative path to pass will all be based on this absolute path

const webpackConfigBase = {
  entry: {
    client: path.resolve('./app/index.js'),
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].[hash:4].js',
    chunkFilename: 'chunks/[name].[hash:4].js',
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      components: path.resolve('./app/components'),
      api: path.resolve('./app/api'),
      utils: path.resolve('./app/utils'),
      images: path.resolve('./app/assets/images'),
      /**
       * Todo: 先不上redux 
       */
    //   controllers: path.join(__dirname, '/../app/controllers'),
    //   actions: path.join(__dirname, '/../app/actions'),
    //   reducers: path.join(__dirname, '/../app/reducers'),
    },
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel',
        options: {
          plugins: [
            ['import', { libraryName: 'antd', style: true }]
          ]
        },
      },
      {
        test: /\.css/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style',
          use: [
            { loader: 'css', options: { sourceMap: true } }
          ]
        }),
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style',
          use: [
            { 
              loader: 'css', 
              options: { sourceMap: true }
            },
            { 
              loader: 'less', 
              options: { 
                sourceMap: true,
                modifyVars: themeVariables
              }
            }
          ]
        }),
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        options: {
          limit: 8192,
          name: 'img/[name].[hash:4].[ext]'
        }
      },
      {
        test: /\.(woff|eot|ttf|svg|gif)$/,
        loader: 'url',
        options: {
          limit: 8192,
          name: 'font/[name].[hash:4].[ext]'
        }
      },
    ],
  },
  plugins: [
    // 提取css
    new ExtractTextPlugin('style.[hash:4].css'),
    // 将打包后的资源注入到html文件内    
    new HtmlWebpackPlugin({
      template: path.resolve('./app/index.html'),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'client', // 入口文件名
      filename: 'common.bundle.js', // 打包后的文件名
      minChunks: function (module) {
        return module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(path.resolve('./node_modules')) === 0;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'async-common',
      minChunks: 3,
    }),
  ]
};

module.exports = webpackConfigBase;
