const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
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

const src = path.join(__dirname, 'src');

module.exports = {
  cache: true,
  entry: {
    index: path.join(src, 'index.pug'),
    app: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      './src/scripts/main.js',
    ],
  },
  devtool: 'cheap-eval-source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['happypack/loader?id=eslint'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['happypack/loader?id=js'],
      },
      {
        test: /\.css$/,
        loaders: ['happypack/loader?id=css'],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['happypack/loader?id=sass'],
      },
      {
        test: /\.(png|jpe?g|gif|webm|mp4|ogv|txt|mp3|ogg|wav|pdf)$/,
        loader: 'file-loader',
        options: {
          context: path.resolve(__dirname, './src'),
          name: '[path][name].[ext]',
        },
      },
      {
        test: /\.pug$/,
        exclude: /node_modules/,
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
            },
          }, {
            loader: 'pug-html-loader',
            options: {
              cache: true,
              data: {
                data,
                user,
                slugify,
                process: {
                  env: {
                    NODE_ENV: 'development',
                  },
                },
              },
            },
          },
        ],
      },
      {
        test: /\.csv$/,
        exclude: /node_modules/,
        use: ['dsv-loader?delimiter=;'],
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        use: ['json-loader'],
      },
      {
        test: /\.(eot|otf|woff|woff2|ttf|svg)$/,
        use: ['url-loader?name=fonts/[name].[ext]'],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 3000,
    publicPath: '/',
  },
  externals: {
    jquery: 'jQuery',
  },
  plugins: [
    new HappyPack({
      id: 'css',
      loaders: [
        'style-loader',
        {
          loader: 'css-loader',
        },
      ],
    }),
    new HappyPack({
      id: 'sass',
      loaders: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            root: './src/images',
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
        {
          loader: 'sass-loader',
        },
        {
          loader: 'import-glob-loader',
        },
      ],
    }),
    new HappyPack({
      id: 'eslint',
      loaders: [
        {
          loader: 'eslint-loader',
          cache: true,
        },
      ],
    }),
    new HappyPack({
      id: 'js',
      loaders: [
        {
          loader: 'babel-loader',
          exclude: /node_modules/,
          include: path.resolve(process.cwd(), 'src'),
        },
      ],
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new CopyWebpackPlugin([
      {
        from: './src/images',
        to: './images',
      },
    ]),
    new HtmlWebpackPlugin({
      data,
      user,
      settings,
      favicon: 'favicon.png',
      title: settings.pageTitle,
      template: './src/index.pug',
    }),
    new StyleLintPlugin({
      syntax: 'scss',
      lintDirtyModulesOnly: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
      },
    }),
  ],
  output: {
    filename: 'bundle.[name].js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
  },
};
