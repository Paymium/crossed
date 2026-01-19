/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Config } from '@jest/types';
import * as path from 'path';

const config: Config.InitialOptions = {
  // preset: "react-native",
  rootDir: process.cwd(),
  moduleFileExtensions: [
    'web.ts',
    'ts',
    'tsx',
    'web.js',
    'flow.js',
    'js',
    'jsx',
  ],
  extensionsToTreatAsEsm: ['.ts', '.tsx', '.mts', '.jsx'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': '@swc/jest',
  },
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    '^react-native-reanimated$':
      '<rootDir>/node_modules/react-native-reanimated/mock',
  },
  collectCoverageFrom: ['./src/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: ['/node_modules/', '__tests__'],
  testRegex: '\\.spec\\.[jt]sx?$',
  transformIgnorePatterns: [
    `${path.join(
      __dirname,
      '../..'
    )}/node_modules/.pnpm/(?!(@tamagui|react-native))`,
  ],
  modulePathIgnorePatterns: ['lib', 'coverage'],
  moduleDirectories: ['./node_modules', 'src'],
  setupFilesAfterEnv: [
    './node_modules/@crossed/test/src/jest-setup.ts',
    './jest-setup.ts',
  ],
  testEnvironment: 'jsdom',
  globals: {
    __DEV__: true,
  },
};

export default config;
