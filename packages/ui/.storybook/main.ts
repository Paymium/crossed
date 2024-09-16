import { StorybookConfig } from '@storybook/react-webpack5';
import StylePlugin from '@crossed/webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const config: StorybookConfig = {
  framework: '@storybook/react-webpack5',
  addons: [
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        plugins: [new MiniCssExtractPlugin()],
      },
    },
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
    '@storybook/addon-controls',
    '@storybook/addon-contexts/register',
    '@storybook/addon-react-native-web',
    '@storybook/addon-interactions',
  ],
  webpackFinal: async (config: any) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
      'tty': "tty-browserify",
      'os': require.resolve("os-browserify/browser")
    };
    config.resolve.extensions = [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      ...config.resolve.extensions,
    ];
    config.plugins = [
      ...config.plugins,
      new StylePlugin({
        configPath: './style.config.ts',
        level: 'debug',
      }),
    ];
    config.module.rules.push({
      test: /\.(mjs|tsx?|jsx?)$/,
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
      },
    });
    return config;
  },
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
};

export default config;
