/*!
 * Copyright (C) 2017-2021 SuperPaintman
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
/* Imports */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const sveltePreprocess = require('svelte-preprocess');
const yaml = require('js-yaml');

/* Init */
const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';
const isWebpackDevServer = process.env.WEBPACK_DEV_SERVER === 'true';
const ssr = !isWebpackDevServer;

const srcPath = path.join(__dirname, 'src');
const imagesPath = path.join(__dirname, 'src/images/');
const outputPath = path.join(__dirname, 'public');
const faviconPath = path.join(__dirname, 'src/images/favicon.png');

const locals = yaml.load(
  fs.readFileSync(path.join(__dirname, './config.yml')).toString()
);

/* Helpers */
function maybeCall(fn) {
  return typeof fn === 'function' ? fn() : fn;
}

function filter(array) {
  return array.filter((item) => !!item);
}

function only(isIt, fn, fall) {
  if (!isIt) {
    return fall !== undefined ? maybeCall(fall) : null;
  }

  return maybeCall(fn);
}

const onlyProd = (fn, fall) => only(prod, fn, fall);
const onlyDev = (fn, fall) => only(!prod, fn, fall);

/* Plugins */
class HtmlWebpackSveltePlugin {
  constructor(render = false) {
    this._render = render;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('HtmlWebpackSveltePlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tap(
        'HtmlWebpackSveltePlugin',
        (data) => {
          if (!this._render) {
            data.html = data.html.replace('$$html$$', '');
            data.html = data.html.replace('$$css$$', '');
            data.html = data.html.replace('$$head$$', '');
            return;
          }

          const sandbox = {
            module: { exports: {} },
            exports: {}
          };
          sandbox.self = sandbox;
          sandbox.global = sandbox;

          const assetName = Object.keys(compilation.assets).find((name) =>
            /\bserver\.js$/.test(name)
          );

          const source = compilation.assets[assetName].source();

          const script = new vm.Script(source);

          const context = new vm.createContext(sandbox);

          script.runInContext(context);

          const component = context.module.exports.default.render({ locals });

          data.html = data.html.replace('$$html$$', component.html);
          // data.html = data.html.replace(
          //   '$$css$$',
          //   `<style>${component.css.code}</style>`
          // );
          data.html = data.html.replace('$$css$$', '');
          data.html = data.html.replace('$$head$$', component.head);
        }
      );
    });
  }
}

/* Config */
module.exports = {
  mode,
  experiments: {
    layers: true
  },
  entry: {
    main: {
      import: path.join(srcPath, 'index.ts'),
      layer: 'client'
    },
    ...(ssr && {
      server: {
        import: path.join(srcPath, 'index.ts'),
        layer: 'server'
      }
    })
  },
  output: {
    path: outputPath,
    filename(pathData) {
      if (pathData.chunk.name === 'server') {
        return '../tmp/js/[name].js';
      }

      return `js/[name]${onlyProd('.[chunkhash]', '')}.js`;
    },
    chunkFilename(pathData) {
      if (pathData.chunk.name === 'server') {
        return '../tmp/js/[name].chunk.js';
      }

      return `js/[name]${onlyProd('.[chunkhash]', '')}.chunk.js`;
    },
    sourceMapFilename: '[file].map',
    publicPath: '/',
    libraryTarget: 'umd',
    globalObject: "typeof self !== 'undefined' ? self : this"
  },
  devtool: onlyDev('source-map', false),
  resolve: {
    alias: {
      svelte: path.dirname(require.resolve('svelte/package.json')),
      images: imagesPath,
      '~': srcPath
    },
    extensions: ['.ts', '.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main']
  },
  plugins: filter([
    /* Define */
    new DefinePlugin({
      LOCALS: JSON.stringify(locals)
    }),

    /* Clean */
    new CleanWebpackPlugin(),

    /* HTML */
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
      excludeChunks: ['server']
    }),
    new HtmlWebpackSveltePlugin(ssr),

    /* Favicons */
    new FaviconsWebpackPlugin({
      logo: faviconPath,
      prefix: `icons/${onlyProd('[chunkhash]/', '')}`,
      persistentCache: false,
      inject: true,
      background: locals.seo.theme_color,
      title: locals.title,
      manifest: {
        name: locals.seo.title,
        short_name: locals.seo.title,
        description: locals.seo.description,
        background_color: locals.seo.theme_color,
        theme_color: locals.seo.theme_color
      },
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: true,
        favicons: true,
        firefox: true,
        opengraph: true,
        twitter: true,
        yandex: true,
        windows: true
      }
    }),

    /* CSS */
    new MiniCssExtractPlugin({
      filename(pathData) {
        if (pathData.chunk.name === 'server') {
          return '../tmp/css/[name].css';
        }

        return `css/[name]${onlyProd('.[chunkhash]', '')}.css`;
      },
      chunkFilename(pathData) {
        if (pathData.chunk.name === 'server') {
          return '../tmp/css/[name].chunk.css';
        }

        return `css/[name]${onlyProd('.[chunkhash]', '')}.chunk.css`;
      }
    })
  ]),
  module: {
    rules: filter([
      /* TypeScript */
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },

      /* Svelte */
      ssr && {
        test: /\.svelte$/,
        issuerLayer: 'server',
        use: {
          loader: 'svelte-loader',
          options: {
            compilerOptions: {
              dev: !prod,
              generate: 'ssr',
              hydratable: ssr
            },
            emitCss: true,
            hotReload: !prod,
            preprocess: sveltePreprocess({ sourceMap: !prod })
          }
        }
      },
      {
        test: /\.svelte$/,
        issuerLayer: 'client',
        use: {
          loader: 'svelte-loader',
          options: {
            compilerOptions: {
              dev: !prod,
              generate: 'dom',
              hydratable: ssr
            },
            // emitCss: prod,
            emitCss: true, // Responsive loader doesn't work without it.
            hotReload: !prod,
            preprocess: sveltePreprocess({ sourceMap: !prod })
          }
        }
      },
      {
        // required to prevent errors from Svelte on Webpack 5+
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false
        }
      },

      /* CSS */
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'stylus-loader' }
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-css-variables', { preserve: false }]]
              }
            }
          }
        ]
      },

      /* Images */
      {
        test: (path) => path.indexOf(imagesPath) === 0,
        use: [
          {
            loader: 'responsive-loader',
            options: {
              name: `images/[name].[width]${onlyProd(
                '.[sha256:hash]',
                ''
              )}.[ext]`
            }
          }
        ]
      }
    ])
  },
  devServer: {
    hot: true
  }
};
