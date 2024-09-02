/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Config } from '@jest/types';
import * as path from 'path';
import { readFileSync } from 'fs';

let localSetup: boolean = false;

try {
  readFileSync(path.resolve(process.cwd(), './jest-setup.ts'));
  localSetup = true;
} catch (_e: any) {
  localSetup = false;
}

const config: Config.InitialOptions = {
  // preset: 'react-native',
  rootDir: process.cwd(),
  extensionsToTreatAsEsm: ['.ts', '.tsx', '.mts'],
  transform: {
    '^.+\\.(j)sx?$': [
      'babel-jest',
      { configFile: path.resolve(__dirname, './babel.config.js') },
    ],
    '^.+\\.(t)sx?$': '@swc/jest',
  },
  moduleNameMapper: {
    // '^@crossed/core$': '<rootDir>/node_modules/@crossed/core/src/index',
    // '^@crossed/styled$': '<rootDir>/node_modules/@crossed/styled/src/index',
    // '^@preact/signals$':
    //   '<rootDir>/../../node_modules/.pnpm/@preact+signals@1.2.2_preact@10.19.3/node_modules/@preact/signals/dist/signals.js',
    // '^@preact/signals-react$':
    //   '<rootDir>/../../node_modules/.pnpm/@preact+signals-react@2.0.0_react@18.2.0/node_modules/@preact/signals-react/dist/signals.js',
    // '^@preact/signals-react/runtime$':
    //   '<rootDir>/../../node_modules/.pnpm/@preact+signals-core@1.5.1/node_modules/@preact/signals-core/dist/signals-core.js',
    // '^@preact/signals-core$':
    //   '<rootDir>/node_modules/@crossed/styled/node_modules/@preact/signals-react/runtime/dist/runtime.js',
    '^react-native$': 'react-native-web',
    // '^react-native-reanimated$':
    //   '<rootDir>/node_modules/react-native-reanimated/mock',
  },
  coveragePathIgnorePatterns: ['/node_modules/', '__tests__'],
  testRegex: '\\.spec\\.[jt]sx?$',
  transformIgnorePatterns: [
    // `${path.join(
    //   __dirname,
    //   '../..'
    // )}/node_modules/.pnpm/(?!(react-native|react-native-reanimated))`,
    'node_modules/(?!((.pnpm/)?(@preact|react-native)))',
  ],
  // transformIgnorePatterns: [
  //   // 'node_modules/(?!((.pnpm/)?((jest-)?react-native|@react-native(-community)?))|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|tamagui|@tamagui/.*|@crossed/.*|react-native-reanimated|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  //   'node_modules/(?!((.pnpm/)?(@preact)))',
  // ],
  modulePathIgnorePatterns: ['lib', 'coverage'],
  moduleDirectories: ['./node_modules', 'src'],
  setupFilesAfterEnv: [
    path.resolve(__dirname, './jest-setup.ts'),
    localSetup && path.resolve(process.cwd(), './jest-setup.ts'),
  ].filter(Boolean) as any[],
  testEnvironment: 'jsdom',
  globals: {
    __DEV__: true,
  },
};

export default config;
