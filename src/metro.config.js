const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

// Add support for .cjs files
config.resolver.sourceExts.push('cjs');

// Use polyfill for react-native-maps on web
if (process.env.EXPO_WEB) {
  config.resolver.extraNodeModules = {
    ...config.resolver.extraNodeModules,
    'react-native-maps': path.resolve(__dirname, './polyfills/react-native-maps-web.tsx'),
  };
}

module.exports = config;
