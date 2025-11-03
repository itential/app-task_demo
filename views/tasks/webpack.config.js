const fs = require('fs');
const path = require('path');

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const { export: appName } = require('../../pronghorn.json');
const { dependencies } = require('../../package.json');

module.exports = {
  // eslint-disable-next-line no-sync
  entry: fs
    .readdirSync(path.join(__dirname, './src'))
    .map((dir) => path.join(__dirname, `./src/${dir}`)),
  output: {
    path: path.join(__dirname, './dist'),
    clean: true,
  },
  mode: 'production',
  target: 'web',
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },

  devServer: {
    static: {
      directory: path.join(__dirname),
    },
    port: 8080,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
  },

  optimization: {
    minimize: true,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: path.join(__dirname, '../../../..', '/node_modules'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: require.resolve('postcss-loader'),
            options: {
              postcssOptions: {
                plugins: {
                  'postcss-prefix-selector': {
                    prefix: `.task-container-${appName}`,
                    transform(
                      prefix,
                      selector,
                      prefixedSelector,
                      filePath,
                      rule,
                    ) {
                      if (selector.match(/^(html|body)/)) {
                        return selector.replace(/^([^\s]*)/, `$1 ${prefix}`);
                      }

                      if (selector.match(/:root/)) {
                        return selector.replace(/:root/, `${prefix}`);
                      }

                      if (filePath.match(/^(?!.*views).*node_modules.*/)) {
                        return selector; // Do not prefix styles imported from node_modules
                      }

                      const annotation = rule.prev();
                      if (
                        annotation &&
                        annotation.type === 'comment' &&
                        annotation.text.trim() === 'no-prefix'
                      ) {
                        return selector; // Do not prefix style rules that are preceded by: /* no-prefix */
                      }

                      return prefixedSelector;
                    },
                  },
                },
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: appName, // The scope name for this module. Should match the IAP app name.
      filename: 'remoteEntry.js',
      remotes: {},
      // Exposes all directories in src as individual modules to be consumed by other apps.
      // Directory names must match the name of the task in pronghorn.json
      exposes: Object.fromEntries(
        fs
          .readdirSync(path.join(__dirname, './src'))
          .map((dir) => [`./${dir}`, path.join(__dirname, `./src/${dir}`)]),
      ),
      shared: {
        react: {
          singleton: true,
          requiredVersion: false,
          eager: true
        },
        'react-dom': {
          singleton: true,
          requiredVersion: false,
          eager: true
        }
      },
    }),
  ],
};
