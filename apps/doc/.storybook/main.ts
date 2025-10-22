import type { StorybookConfig } from '@storybook/react-webpack5';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import StylePlugin from '@crossed/webpack';
import webpack from 'webpack';
import path from "path"

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        plugins: [new MiniCssExtractPlugin()],
      },
    },
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    "@chromatic-com/storybook",
    'storybook-dark-mode',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    "@storybook/addon-designs"
  ],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      propFilter: (prop) => {
        // ignore tout ce qui vient de node_modules (ex: Pressable)
        if (prop.parent) {
          return !/node_modules/.test(prop.parent.fileName);
        }
        return true;
      },
  //     compilerOptions: {
  //       allowSyntheticDefaultImports: false,
  //       esModuleInterop: false,
  //     },
    },
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  staticDirs: ['../public'],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  webpackFinal: async (config: any) => {
    if (!config.resolve) {
      config.resolve = {};
    }
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
      'tty': 'tty-browserify',
      'os': require.resolve('os-browserify/browser'),
      '@gorhom/portal': require.resolve('@gorhom/portal'),
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
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
      }),
      new StylePlugin({
        configPath: './src/style.config.ts',
        level: 'debug',
        out: path.resolve(__dirname, '../storybook-static')
      }),
    ];
    config.module.rules.push({
      test: /\.(mjs|tsx?|jsx?)$/,
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
      },
    });
    Object.assign(config.resolve.fallback, { os: false, tty: false });
    return config;
  },
};
export default config;
