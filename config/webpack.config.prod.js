'use strict';

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { HashedModuleIdsPlugin } = require('webpack');
const merge = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const baseConfig = require('./webpack.config');

const analyzeBuild = process.env.ANALYZE === 'true';

const prod = {
  mode: 'production',
  output: {
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].min.js',
  },
  optimization: {
    splitChunks: {
      minChunks: 2,
      maxInitialRequests: 5,
      cacheGroups: {
        commons: { chunks: 'initial' },
        vendor: { test: /node_modules/, chunks: 'initial', name: 'vendor', priority: 10 },
      },
    },
    runtimeChunk: {
      name: 'manifest',
    },
    removeEmptyChunks: true,
  },
  plugins: [
    new HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: 'public/favicon.ico',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessorOptions: {
        autoprefixer: false,
        mergeLonghand: true,
        discardComments: {
          removeAll: true,
        },
      },
      canPrint: false,
    }),
    new CleanWebpackPlugin({
      verbose: true,
    }),
    analyzeBuild && new BundleAnalyzerPlugin(),
  ].filter(Boolean),
};

module.exports = merge(baseConfig({ extractCSS: true }), prod);
