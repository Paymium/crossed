/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

/* eslint-disable @typescript-eslint/no-var-requires */

// eslint-disable-next-line no-undef
const { makeMetroConfig } = require('@rnx-kit/metro-config');
// eslint-disable-next-line no-undef
const MetroSymlinksResolver = require('@rnx-kit/metro-resolver-symlinks');

// eslint-disable-next-line no-undef
module.exports = makeMetroConfig({
  // eslint-disable-next-line no-undef
  projectRoot: __dirname,
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: true,
        inlineRequires: true,
      },
    }),
    unstable_allowRequireContext: true,
  },
  resolver: {
    resolveRequest: MetroSymlinksResolver(),
    unstable_enablePackageExports: true,
    unstable_enableSymlinks: true,
    enableGlobalPackages: false,
  },
});
