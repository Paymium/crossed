const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: [
    'react-native',
    'react-native-reanimated',
  ],
  basePath: '/crossed',
  webpack: (config, { webpack }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native$': 'react-native-web',
    };

    config.resolve.extensions = [
      '.web.js',
      '.web.ts',
      '.web.tsx',
      ...config.resolve.extensions,
    ];

    // config.module.rules.push({
    //   test: /react-native-reanimated/,
    //   use: {
    //     loader: 'babel-loader',
    //     options: {
    //       presets: [
    //         '@babel/preset-react',
    //         { plugins: ['react-native-reanimated/plugin'] },
    //       ],
    //     },
    //   },
    // });

    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
      })
    );

    return config;
  },
};

module.exports = nextConfig;
