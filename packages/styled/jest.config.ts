import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  // preset: 'react-native',
  rootDir: './',
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
  },
  moduleDirectories: ['./node_modules', 'src'],
  setupFilesAfterEnv: ['./jest-setup.js'],
  testEnvironment: 'jsdom',
};

export default config;
