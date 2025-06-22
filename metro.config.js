const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push('cjs'); //nova
config.resolver.unstable_enablePackageExports = false;  //nova

module.exports = withNativeWind(config, { input: './global.css' });

