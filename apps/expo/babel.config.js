module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Required for expo-router
      // ['@crossed/babel-plugin', { tailwindPath: "./node_modules/@crossed/tailwind/tailwind.config.js" }],
      // 'expo-router/babel',
      'react-native-reanimated/plugin'
    ],
  };
};
