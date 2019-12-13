const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const src = path.resolve(process.cwd(), 'src');
const publix = path.resolve(process.cwd(), 'public');
const dist = path.resolve(process.cwd(), 'dist');

module.exports = function config(env) {
  const isProd = env === 'production';
  const config = {
    mode: env || 'development',
    entry: `${src}/index.js`,
    output: {
      path: dist,
      publicPath: '/',
      filename: `[name].${isProd ? '[hash].min.js' : 'js'}`,
      pathinfo: !isProd,
    },
    module: {
      rules: [
        // linting
        {
          test: /\.jsx?$/,
          enforce: 'pre',
          include: [src],
          exclude: [/node_modules/, /public/],
          loader: 'eslint-loader',
          options: {
            failOnWarning: isProd
          }
        },

        // javascript transform
        {
          test: /\.jsx?$/,
          include: [src],
          exclude: [/node_modules/],
          use: [
            { loader: 'babel-loader' },
            {
              loader: 'linaria/loader',
              options: {
                sourceMap: !isProd
              }
            }
          ]
        },

        // less compiler and css loader
        {
          test: /\.css$/,
          use: [
            { loader: MiniCssExtractPlugin.loader, options: { hmr: !isProd } },
            { loader: 'css-loader', options: { sourceMap: true, url: false } },
          ]
        },

        // static asset loader
        {
          test: /\.(jpg|jpeg|gif|png|ico|ttf|eot|dtd|svg|woff(2)?)(\?[a-z0-9=.]+)?$/,
          loader: 'file-loader'
        },
      ]
    },
    resolve: {
      modules: [src, path.resolve('./node_modules')],
      extensions: ['.js', '.jsx', '.json', '.css', '.html', '.svg', '.png', '.jpeg'],
      alias: {
        '@': src
      },
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: `[name].${isProd ? '[contenthash].min.css' : 'css'}`,
        disable: false,
        allChunks: true,
      }),

      new HtmlWebpackPlugin({
        template: `${src}/index.html`
      }),

      new CopyWebpackPlugin([
        { from: publix, to: dist }, // move all static assets and public files
      ], {
        copyUnmodified: false,
      }),

      new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: isProd ? 'nosources-source-map' : 'eval-source-map',
    devServer: {
      compress: true,
      port: 9000,
      hot: true,
      inline: true,
      historyApiFallback: true
    }
  };

  if (isProd) {
    // minimizes and splits code into css, vendor, and app bundles
    config.optimization = {
      splitChunks: {
        chunks: 'all',
      },
      minimize: true,
      minimizer: [
        new OptimizeCSSAssetsPlugin({}),
        new TerserPlugin({
          terserOptions: {
            mangle: false,
            safari10: true
          }
        })
      ],
    };
  }

  return config;
}
