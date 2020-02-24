const path = require('path');
const globImporter = require('node-sass-glob-importer');

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Allows for inline comments to be used with Typescript for documenting
  // React components.
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loaders: [
      'ts-loader',
      'react-docgen-typescript-loader'
    ]
  });

  config.module.rules.push({
    test: /\.svg$/,
    include: [path.join(__dirname, "./icons/")],
    loader: "file-loader?name=assets/[name].[ext]"
  });

  // Adds SCSS support
  config.module.rules.push({
    test: /\.scss$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: true
        }
      },
      {
        loader: 'sass-loader',
        options: {
          importer: globImporter(),
        }
      }
    ],
    include: [path.resolve(__dirname, './styles/**/*')]
  });

  // Include stories in babel loader
  const babelRules = config.module.rules.filter(rule => {
    let isBabelLoader = false;

    if (rule.loader && rule.loader.includes('babel-loader')) {
      isBabelLoader = true;
    }

    if (rule.use) {
      rule.use.forEach(use => {
        if (typeof use === 'string' && use.includes('babel-loader')) {
          isBabelLoader = true;
        } else if (
          typeof use === 'object' &&
          use.loader &&
          use.loader.includes('babel-loader')
        ) {
          isBabelLoader = true;
        }
      });
    }

    return isBabelLoader;
  });

  babelRules.forEach(rule => {
    rule.include = /../;
    rule.exclude = /node_modules/;
  });

  // Return the altered config
  return config;
};
