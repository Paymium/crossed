/* eslint-disable @typescript-eslint/no-var-requires */

// eslint-disable-next-line no-undef
const { makeMetroConfig } = require("@rnx-kit/metro-config");
// eslint-disable-next-line no-undef
const MetroSymlinksResolver = require("@rnx-kit/metro-resolver-symlinks");

// eslint-disable-next-line no-undef
module.exports = makeMetroConfig({
  // eslint-disable-next-line no-undef
  projectRoot: __dirname,
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    resolveRequest: MetroSymlinksResolver(),
  },
});
