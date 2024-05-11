const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
// const indexpath = require('')

module.exports = {
  mode: 'development',
  entry: {
    main: './src/js/index.js', // Entry point for the main bundle
    install: './src/js/install.js' // Entry point for the install bundle
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // Path to index.html template
      filename: 'index.html', // Output filename (defaults to index.html)
    }),
    new WebpackPwaManifest({
      name: 'My PWA Text Editor',
      short_name: 'Text Editor',
      description: 'A text editor Progressive Web Application',
      background_color: '#ffffff',
      theme_color: '#2196f3',
      icons: [
        {
          src: path.resolve('./src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512]
        }
      ]
    }),
    new InjectManifest({
      swSrc: './src-sw.js',
      swDest: 'sw.js',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },
};
