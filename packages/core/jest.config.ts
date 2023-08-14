import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  rootDir: './src',
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
};

export default config;
