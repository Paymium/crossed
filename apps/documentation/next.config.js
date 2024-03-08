const withCrossed = require('@crossed/next-adapter');

/** @type {import('next').NextConfig} */
const nextConfig = withCrossed.default({
  configPath: './src/style.config.ts',
})({
  output: 'export',
  reactStrictMode: false,
  transpilePackages: ['react-native', 'react-native-reanimated'],
  basePath: '/crossed',
  webpack: (config, { webpack, isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native$': 'react-native-web',
    };

    config.resolve.extensions = [
      '.web.js',
      '.web.ts',
      '.web.tsx',
      '.server.tsx',
      '.server.jsx',
      '.server.js',
      ...config.resolve.extensions,
    ];

    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
      })
    );

    return config;
  },
});

module.exports = nextConfig;
