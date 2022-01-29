const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const port = process.env.PORT || 3000;

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    filename: 'bundle.[chunkhash:8].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    clean: true,
    assetModuleFilename: 'static/media/[name].[hash:8][ext]'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true
            },
          }
        ]
      },
      {
        test:  /\.(png|svg|jpg|jpeg|gif|svg|webp)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: { // phaser 3 cannot lead blob urls
            maxSize: 1
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true)
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new Dotenv(),
    new CaseSensitivePathsPlugin()
  ],
  devServer: {
    host: 'localhost',
    port: port,
    open: false
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          sourceMap: true,
          compress: {
            drop_console: true
          }
        }
      })
    ]
  }
};