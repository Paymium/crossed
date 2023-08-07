/** @type {import('next').NextConfig} */

const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
});

const { withMergeui } = require('@mergeui/next-adapter');

module.exports = withNextra(
  withMergeui({
    transpilePackages: ['@mergeui/core'],
  })
);
