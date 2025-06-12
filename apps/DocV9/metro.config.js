const path = require('path');
const withStorybook = require('@storybook/react-native/metro/withStorybook');

const { makeMetroConfig } = require('@rnx-kit/metro-config');
const MetroSymlinksResolver = require('@rnx-kit/metro-resolver-symlinks');
const { getDefaultConfig } = require('expo/metro-config');
const {
  CyclicDependencies,
} = require('@rnx-kit/metro-plugin-cyclic-dependencies-detector');
const { MetroSerializer } = require('@rnx-kit/metro-serializer');
const {
  DuplicateDependencies,
} = require('@rnx-kit/metro-plugin-duplicates-checker');

let config = getDefaultConfig(__dirname);
config = makeMetroConfig({
  ...config,
  serializer: {
    ...config.serializer,
    customSerializer: MetroSerializer([
      DuplicateDependencies({
        throwOnError: false,
      }),
      CyclicDependencies({
        includeNodeModules: false,
        linesOfContext: 1,
        throwOnError: false,
      }),
    ]),
  },
  resolver: {
    ...config.resolver,
    resolveRequest: MetroSymlinksResolver(),
  },
});

module.exports = withStorybook(config, {
  enabled: true,
  configPath: path.resolve(__dirname, './.rnstorybook'),
});
