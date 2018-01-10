const path = require('path');
const fs = require('fs');

const bemConfig = require('@bem/sdk.config')();
const levels = bemConfig.levelMapSync();

const appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
    return path.resolve(appDirectory, relativePath);
}

function ensureSlash(path, needsSlash) {
    const hasSlash = path.endsWith('/');
    if (hasSlash && !needsSlash) {
        return path.substr(path, path.length - 1);
    } else if (!hasSlash && needsSlash) {
        return `${path}/`;
    } else {
        return path;
    }
}

module.exports = {
    levels,
    appBuild: resolveApp('build'),
    appHtml: resolveApp('public/index.html'),
    appIndexJs: resolveApp('src/index.js'),
    appPackageJson: resolveApp('package.json'),
    appPublic: resolveApp('public'),
    appSets: null,
    appSrc: resolveApp('src'),
    appTarget: 'web',
    publicPath: '/',
    publicUrl: '',
    servedPath: ensureSlash('/', true),
};
