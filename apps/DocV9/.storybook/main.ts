import { StorybookConfig } from "@storybook/react-native-web-vite";
import { mergeConfig } from 'vite';
import path from 'path';
import * as crossedPlugin from "vite-plugin-crossed-styled";

const main: StorybookConfig = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],

  addons: ["@storybook/addon-docs", "@chromatic-com/storybook"],

  framework: {
    name: "@storybook/react-native-web-vite",
    options: {},
  },

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      //     compilerOptions: {
      //       allowSyntheticDefaultImports: false,
      //       esModuleInterop: false,
      //     },
    },
  },
  // typescript: {
  //   reactDocgen: "react-docgen",
  // },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      plugins: [
        crossedPlugin.default({
          configPath: path.resolve(
            __dirname,
            '../style.config.ts'
          ),
        }),
      ],
    });
  },
};


export default main;
