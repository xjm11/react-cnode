'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const { HotModuleReplacementPlugin } = require('webpack');

const baseConfig = require('./webpack.config');

// const isMockMode = process.env.MOCK === 'true';

// const proxyConfig = {
//   target: isMockMode ? 'http://localhost:3001' : '',
//   changeOrigin: true,
// };

const dev = {
  mode: 'development',
  output: {
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].min.js',
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: 'dist',
    publicPath: '/',
    // 禁用 host 检查
    disableHostCheck: true,
    inline: true,
    hot: true,
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: true,
    // proxy: {
    //   '/prediction': proxyConfig,
    // },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: 'public/favicon.ico',
      inject: true,
    }),
    new HotModuleReplacementPlugin(),
  ],
};

module.exports = merge(baseConfig({ extractCSS: false, poolTimeout: Infinity }), dev);
