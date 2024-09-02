const { withCrossed } = require('@crossed/next-adapter');

/** @type {import('next').NextConfig} */
const nextConfig = withCrossed({
  configPath: './src/style.config.ts',
  level: "debug"
})({
  output: 'export',
  reactStrictMode: false,
  // transpilePackages: ['react-native', 'react-native-reanimated'],
  basePath: '/crossed',
  webpack: (config, { webpack, isServer }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
      })
    );

    return config;
  },
});

module.exports = nextConfig;
