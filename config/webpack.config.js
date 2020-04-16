'use strict';

const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
const { ContextReplacementPlugin } = require('webpack');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const paths = require('./paths');

module.exports = ({ extractCSS = false, poolTimeout = 500 }) => {
  const babelLoader = {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
    },
  };

  const cacheLoaders = [
    { loader: 'cache-loader' },
    {
      loader: 'thread-loader',
      options: {
        workers: require('os').cpus().length - 1,
        poolTimeout,
      },
    },
  ];

  return {
    context: paths.appPath,
    entry: {
      app: './src/index.jsx',
    },
    output: {
      path: paths.appBuild,
      publicPath: '/',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        ...paths.alias,
        'react-dom': '@hot-loader/react-dom',
      },
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [...cacheLoaders, babelLoader],
        },
        {
          // antd import
          test: /\.css$/,
          include: /node_modules/,
          use: [
            extractCSS ? { loader: MiniCssExtractPlugin.loader } : { loader: 'style-loader' },
            { loader: 'css-loader' },
          ].filter(Boolean),
        },{
          // Transform our own .css files with PostCSS and CSS-modules
          test: /\.css$/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader'],
        },
        {
          // antd import
          test: /\.less$/,
          include: /node_modules/,
          use: [
            extractCSS ? { loader: MiniCssExtractPlugin.loader } : { loader: 'style-loader' },
            { loader: 'css-loader' },
            {
              loader: 'less-loader',
              options: {
                modifyVars: {
                  'primary-color': '#D62103',
                  'border-radius-base': '3px',
                },
                javascriptEnabled: true,
              },
            },
          ].filter(Boolean),
        },
        {
          test: /\.(scss|sass)$/,
          exclude: /node_modules/,
          use: [
            extractCSS ? { loader: MiniCssExtractPlugin.loader } : { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[name]__[local]--[hash:base64:5]',
                },
                importLoaders: 1,
              },
            },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader' },
          ].filter(Boolean),
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|svg|ttf|eot)($|\?)/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CaseSensitivePathsPlugin(),
      new ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
      new CopyPlugin([{ from: paths.appAssets, to: 'assets' }]),
      // new MonacoWebpackPlugin({
      //   output: 'static/js',
      //   // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
      //   languages: ['python'],
      // }),
      new WebpackBar(),
      extractCSS &&
        new MiniCssExtractPlugin({
          filename: 'static/css/[name].[hash:8].css',
          chunkFilename: 'static/css/[id].[hash:8].css',
        }),
    ].filter(Boolean),
    node: {
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
    },
  };
};
