// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');

const commitHash = require('child_process')
  .execSync('git rev-parse --short HEAD')
  .toString();

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __COMMIT_HASH__: JSON.stringify(commitHash),
      }),
    ],
  },
};
