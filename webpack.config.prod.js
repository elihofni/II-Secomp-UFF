const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const settings = require('./package.json').settings;
const data = require('./src/data/data.json');
const user = require('./src/data/user.json');

function slugify(string) {
  let str = string.replace(/^\s+|\s+$/g, '').toLowerCase();

  const from = 'àáäâãèéëêìíïîõòóöôùúüûñç·/_,:;';
  const to = 'aaaaaeeeeiiiiooooouuuunc------';

  for (let i = 0, l = from.length; i < l; i += 1) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  return str;
}

module.exports = {
  entry: {
    app: './src/scripts/main.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          }],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
              },
            },
          ],
        }),
      },
      {
        test: /\.scss$/,
        enforce: 'pre',
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                discardComments: {
                  removeAll: true,
                },
                minimize: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins() {
                  return [autoprefixer({
                    browsers: ['> 1%', 'last 2 versions'],
                  })];
                },
              },
            },
            'sass-loader',
            {
              loader: 'import-glob-loader',
            },
          ],
        }),
      },
      {
        test: /\.(png|jpe?g|gif|webm|mp4|ogv|txt|mp3|ogg|wav|pdf)$/,
        loader: 'file-loader',
        options: {
          context: path.resolve(__dirname, './src'),
          name: '[path][name].[ext]',
        },
      }, {
        test: /\.csv$/,
        use: ['dsv-loader?delimiter=;'],
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: [
                'img:src',
                'img:srcset',
                'source:src',
                'source:srcset',
              ],
              removeComments: false,
            },
          }, {
            loader: 'pug-html-loader',
            options: {
              exports: false,
              data: {
                settings,
                slugify,
                data,
                user,
                process: {
                  env: {
                    NODE_ENV: 'production',
                  },
                },
              },
            },
          },
        ],
      },
      {
        test: /\.json$/,
        use: ['json-loader'],
      },
      {
        test: /\.(eot|otf|woff|woff2|ttf|svg)$/,
        use: ['url-loader?name=fonts/[name].[ext]'],
      },
    ],
  },
  externals: {
    jquery: 'jQuery',
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: 'favicon.png',
      title: settings.pageTitle,
      template: path.join('./src', 'index.pug'),
    }),
    new CopyWebpackPlugin([
      {
        from: './src/images',
        to: './images',
      },
    ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new ExtractTextPlugin('main.css'),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
  ],
  output: {
    filename: 'bundle.[name].js',
    path: path.resolve('dist'),
    publicPath: './',
  },
};
