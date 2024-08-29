const { rewritePkgFile } = require('./rewrite.cjs');
const path = require('path');

const inputs = [
  'utils',
  'map-api',
  'map',
  'theme-chalk',
];
rewriteFiles(inputs);


function rewriteFiles(inputs = []) {
  inputs.map(input => {
    return path.resolve(__dirname, `../packages/${ input }/package.json`)
  }).forEach(file => {
    rewritePkgFile({
      main: ['src/index.ts', 'dist/index.mjs'],
      types: ['src/index.ts', 'dist/index.d.ts'],
      module: ['src/index.ts', 'dist/index.cjs']
    }, file)
  });
}
