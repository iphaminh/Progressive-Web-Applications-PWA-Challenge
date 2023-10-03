const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin'); //plugin from the Workbox library.

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html',
      }),
      new WebpackPwaManifest({
        fingerprints: false, //not adding hash to name files which really messy
        inject: true,
        name: 'JATE',
        short_name: 'JATE',
        description: 'JATE INNOVATION',
        background_color: '#ffffff',
        crossorigin: 'use-credentials',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
          },
        ],
      }),
      new InjectManifest({ //plugin from Workbox allows you to create a list of files to be precached in the service worker
        swSrc: './src-sw.js',
      }),
    ],
    

    module: {
      rules: [
        {
          test: /\.css$/i, //not strictly for .css file
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/, //match files end in .js and .mjs
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'], //to transpile the object rest spread syntax in your code to ES5, which is more widely supported by older browsers.
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-transform-runtime'], //inject some "helper" functions to make certain features work in older browsers
            },
          },
        },
      ],
    },
  };
};
