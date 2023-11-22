import type { Config } from '@jest/types';
import path from 'path';

const config: Config.InitialOptions = {
  // preset: 'react-native',
  rootDir: process.cwd(),
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  moduleNameMapper: {
    '^@crossed/core$': '<rootDir>/node_modules/@crossed/core/src/index',
    '^@crossed/styled$': '<rootDir>/node_modules/@crossed/styled/src/index',
    '^react-native$': 'react-native-web',
  },
  modulePathIgnorePatterns: ['lib', 'coverage'],
  moduleDirectories: ['./node_modules', 'src'],
  setupFilesAfterEnv: [path.resolve(__dirname, './jest-setup.js')],
  testEnvironment: 'jsdom',
};

export default config;
