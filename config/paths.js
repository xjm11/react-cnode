const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const alias = {
  '@': resolveApp('src'),
};

module.exports = {
  appPath: resolveApp('.'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appDist: resolveApp('dist'),
  appHtml: resolveApp('public/index.html'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appAssets: resolveApp('src/assets'),
  appNodeModules: resolveApp('node_modules'),
  alias,
};
