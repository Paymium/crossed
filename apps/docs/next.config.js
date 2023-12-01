const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
});
const path = require('path');

const { withCrossed } = require('@crossed/next-adapter');
/** @type {import('next').NextConfig} */
module.exports = withNextra(
  withCrossed(
    {
    images: {
      unoptimized: true,
    },
    basePath: process.env.NODE_ENV === 'development' ? undefined : '/crossed',
    assetPrefix: process.env.NODE_ENV === 'development' ? '/' : '/crossed/',
    output: 'export',
    transpilePackages: ['@crossed/core'],
    webpack: (config, { isServer, dev, webpack } = {}) => {
      if (!config.plugins) {
        config.plugins = [];
      }
      config.plugins.push(
        new webpack.DefinePlugin({
          __DEV__: dev,
        })
      );
      // if (isServer) {
      //   config.plugins.push(
      //     new webpack.ProvidePlugin({
      //       requestAnimationFrame: path.resolve(
      //         __dirname,
      //         './node_modules/raf/polyfill.js'
      //       ),
      //     })
      //   );
      // }
      return config;
    },
  })
);
