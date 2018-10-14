/*!
 * Copyright (C) 2017-2018 SuperPaintman
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/** Requires */
const fs                    = require('fs');
const path                  = require('path');
const vm                    = require('vm');

const webpack               = require('webpack');
const CleanWebpackPlugin    = require('clean-webpack-plugin');
const HtmlWebpackPlugin     = require('html-webpack-plugin');
const ExtractTextPlugin     = require('extract-text-webpack-plugin');
const { CheckerPlugin }     = require('awesome-typescript-loader');
const ImageminPlugin        = require('imagemin-webpack-plugin').default;
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const { renderToString }    = require('react-dom/server');

const yaml                  = require('js-yaml');

const p                     = require('./package.json');


/** Constants */
const IS_PRODUCTION     = process.env.NODE_ENV === 'production';

const appPath           = path.join(__dirname, 'src/app/');
const stylesPath        = path.join(__dirname, 'src/styles/');
const imagesPath        = path.join(__dirname, 'src/images/');

const outputPath        = path.join(__dirname, 'public');

const templatePath      = path.join(__dirname, 'src/templates/views/index.pug');
const faviconPath       = path.join(imagesPath, 'favicon.png');

const locals = yaml.load(
  fs.readFileSync(path.join(__dirname, './config.yml')).toString()
);


/** Helpers */
function filterNull(array) {
  return array.filter((item) => item !== null);
}

function only(isIt, fn, fall) {
  if (!isIt) {
    return fall !== undefined ? fall() : null;
  }

  return fn();
}

const onlyProd = (fn, fall) => only(IS_PRODUCTION, fn, fall);
const onlyDev = (fn, fall) => only(!IS_PRODUCTION, fn, fall);


/** Plugins */
class HtmlWebpackReactPlugin {
  apply(compiler) {
    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('html-webpack-plugin-before-html-processing', (htmlPluginData, callback) => {
        const sandbox = {
          module: { exports: { } },
          exports: { }
        };

        const assetName = Object.keys(compilation.assets)
          .find((name) => /\bmain\b.*\.js$/.test(name));

        const script = new vm.Script(compilation.assets[assetName].source());

        const context = new vm.createContext(sandbox);

        script.runInContext(context);

        htmlPluginData.html = htmlPluginData.html.replace(
          '<div id="root"></div>',
          `<div id="root">${
            renderToString(context.module.exports.default())
          }</div>`
        );

        callback(null, htmlPluginData);
      });
    });
  }
}


module.exports = {
  entry: {
    main: path.join(appPath, 'index.re')
  },
  output: {
    path: outputPath,
    filename: `js/[name]${onlyProd(() => '.[chunkhash]', () => '')}.js`,
    chunkFilename: `js/[name]${onlyProd(() => '.[chunkhash]', () => '')}.chunk.js`,
    sourceMapFilename: '[file].map',
    publicPath: '/',
    libraryTarget: 'umd'
  },
  devtool: onlyDev(() => 'source-map', () => ''),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.re', '.ml'],
    alias: {
      styles: stylesPath,
      images: imagesPath,
      '~':    appPath
    }
  },
  plugins: filterNull([
    /** DefinePlugin */
    new webpack.DefinePlugin({
      IS_PRODUCTION:  JSON.stringify(IS_PRODUCTION),
      VERSION:        JSON.stringify(p.version),
      LOCALS:         JSON.stringify(locals),
      'process.env': {
        NODE_ENV:       JSON.stringify(process.env.NODE_ENV)
      }
    }),

    /** Hot Module Replacement */
    onlyDev(() => new webpack.HotModuleReplacementPlugin()),

    /** JavaScript */
    onlyProd(() => new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      comments: false
    })),

    /** Clean */
    new CleanWebpackPlugin([outputPath]),

    /** TypeScript */
    new CheckerPlugin(),

    /** Images */
    onlyProd(() => new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/
    })),

    /** Template */
    new HtmlWebpackPlugin({
      title:    locals.title,
      counters: locals.counters,
      seo:      locals.seo,
      template: templatePath
    }),
    onlyProd(() => new HtmlWebpackReactPlugin()),

    /** Favicons */
    new FaviconsWebpackPlugin({
      logo:            faviconPath,
      prefix:          'icons/[hash]/',
      persistentCache: false,
      inject:          true,
      background:      locals.seo.theme_color,
      title:           locals.title,
      icons: {
        android:      true,
        appleIcon:    true,
        appleStartup: true,
        coast:        true,
        favicons:     true,
        firefox:      true,
        opengraph:    true,
        twitter:      true,
        yandex:       true,
        windows:      true
      }
    }),

    /** CSS */
    new ExtractTextPlugin({
      filename: `css/[name]${onlyProd(() => '.[chunkhash]', () => '')}.css`
    }),

    /** Chunks */
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: (module) => /node_modules/.test(module.resource)
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'commons'
    // })
  ]),
  devServer: {
    contentBase: outputPath,
    hot: true,
    compress: true,
    port: 8080,
    inline: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: true,
      ignored: /node_modules/
    }
  },
  module: {
    rules: [
      /** Pug */
      {
        test: /\.pug$/,
        exclude: /node_modules/,
        loader: 'pug-loader'
      },

      /** Images */
      {
        test: (path) => path.indexOf(imagesPath) === 0,
        use: [
          {
            loader: 'responsive-loader',
            options: {
              name: `images/[name].[width]${onlyProd(() => '.[sha256:hash]', () => '')}.[ext]`
            }
          }
        ]
      },

      /** CSS */
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'stylus-loader'
          ]
        })
      },

      /** JavaScript */
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: filterNull([
          onlyDev(() => ({ loader: 'react-hot-loader' })),
          {
            loader: 'awesome-typescript-loader',
            options: {
              useBabel: true
            }
          }
        ])
      },

      /** ReasonML */
      {
        test: /\.(re|ml)$/,
        loader: 'bs-loader'
      }
    ]
  }
};
