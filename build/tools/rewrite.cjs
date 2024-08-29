const fs = require('fs-extra');

module.exports = {
  rewritePkgFile: function rewritePkgFileDEV(devOps, path = './package.json') {
    const pkgJson = fs.readJsonSync(path);
    for (const [key, value] of Object.entries(devOps)) {
      pkgJson[key] = process.env.NODE_ENV === 'development' ? value[0] : value[1];
    }
    fs.writeJsonSync(path, pkgJson, { spaces: 2 });
  },
  rewriteFile: function (path, cb = (pkg) => {}) {
    const pkgJson = fs.readJsonSync(path);
    cb(pkgJson);
    fs.writeJsonSync(path, pkgJson, { spaces: 2 });
  },
  readFile(path) {
    return fs.readJsonSync(path);
  },
};
