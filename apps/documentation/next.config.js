const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    'react-native',
    'react-native-reanimated',
    'react-native-unistyles',
    '@crossed/styled',
  ],
  webpack: (config, { webpack }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native$': 'react-native-web',
      'react-native-unistyles$': path.resolve(
        __dirname,
        '../../node_modules/.pnpm/react-native-unistyles@2.0.0_@react-native+normalize-colors@0.73.2_react-native-web@0.19.10_r_lpfmakqcc5anks54r56ubcsaim/node_modules/react-native-unistyles/lib/module/index.js'
      ),
      '@crossed/styled$': path.resolve(
        __dirname,
        './node_modules/@crossed/styled/src/index.ts'
      ),
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
