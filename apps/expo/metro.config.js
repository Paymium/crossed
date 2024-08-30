const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const modulesRoot = path.resolve(__dirname, '../../node_modules');
const packagesRoot = path.resolve(__dirname, '../../packages');
const appRoot = path.resolve(__dirname, '../../apps/expo');

const config = getDefaultConfig(__dirname);
config.watchFolders = [modulesRoot, packagesRoot, appRoot];
config.resolver.unstable_enableSymlinks = true;
config.resolver.unstable_enablePackageExports = true;
module.exports = config;
