const webpack = require('webpack');
const { merge } = require('webpack-merge');
const config = require('./webpack.dev');
const path = require('path');
const { readFile } = require('./tools/rewrite.cjs');

const inputs = process.argv.slice(2);
const buildPackage = inputs[0] || '';
const pkgFile = readFile(path.resolve(__dirname, '../', buildPackage, 'package.json'));
if (!pkgFile.build || !pkgFile.build.name) {
  throw Error(' build params is not nullable');
}
/**@type { import("webpack").Configuration } */
const _config = {
  entry: {
    [pkgFile.build.name]: {
      import: path.resolve(__dirname, '../packages', buildPackage, pkgFile.build.entry),
      library: {
        name: pkgFile.build.name,
        type: pkgFile.build.type || 'umd',
        auxiliaryComment: {
          root: 'Root Module',
          commonjs: 'CommonJS Module',
          commonjs2: 'CommonJS2 Module',
          amd: 'AMD Module',
        },
      },
    },
  },
  output: {
    path: path.resolve(__dirname, '../packages', buildPackage, 'dist'),
  },
};

webpack(merge(config, _config), (err, stats) => {
  if (err || stats?.hasErrors()) {
    console.log('error', err);
  }
  // 处理完成
});
