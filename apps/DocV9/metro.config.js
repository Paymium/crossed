const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

// const MetroSymlinksResolver = require('@rnx-kit/metro-resolver-symlinks');
const withStorybook = require("@storybook/react-native/metro/withStorybook");
const MetroSymlinksResolver = require('@rnx-kit/metro-resolver-symlinks');


module.exports = withStorybook(
  { ...defaultConfig,
    resolver:
      {
        ...defaultConfig.resolver,
        resolveRequest: MetroSymlinksResolver(),
        unstable_enablePackageExports: true,
        unstable_enableSymlinks: true,
        enableGlobalPackages: false,
      },
  },
  {
    enabled: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true',
    onDisabledRemoveStorybook: true,
  }
);
