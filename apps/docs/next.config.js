/** @type {import('next').NextConfig} */

const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
});

const { withMergeui } = require('@mergeui/next-adapter');

module.exports = withNextra(
  withMergeui({
    images: {
      unoptimized: true,
    },
    basePath: process.env.NODE_ENV === 'development' ? undefined : '/mergeui',
    assetPrefix: process.env.NODE_ENV === 'development' ? '/' : '/mergeui/',
    output: 'export',
    transpilePackages: ['@mergeui/core'],
  })
);
