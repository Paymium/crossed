module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          'react-native-gesture-handler':
            './node_modules/react-native-gesture-handler',
        },
      },
    ],
  ],
};
