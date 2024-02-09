/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import StylePlugin, { type StylePluginOptions } from '@crossed/webpack';
export default (
  options: StylePluginOptions = { cssOutput: './public/crossed.css' }
) => {
  return function withCrossed(nextConfig: any = {}) {
    const updatedNextConfig = {
      ...nextConfig,
      // transpilePackages: [...nextConfig.transpilePackages, '@crossed/styled'],
      webpack: (config: any, context: any) => {
        const { isServer } = context;
        config = nextConfig.webpack
          ? nextConfig.webpack(config, context)
          : config;

        config.resolve.extensions = [
          '.web.js',
          '.web.ts',
          '.web.tsx',
          ...config.resolve.extensions,
        ];

        config.module.rules.push({
          test: /\.ttf$/,
          loader: 'url-loader',
        });

        config.resolve.alias = {
          ...(config.resolve.alias || {}),
          'react-native$': 'react-native-web',
        };

        // if (isServer) {
        config.plugins = [
          ...config.plugins,
          new StylePlugin({ ...options, isServer }),
        ];
        // }

        return config;
      },
    };

    return updatedNextConfig;
  };
};
