import type { Config } from '@jest/types';
import path from 'path';
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
  transform: {
    '^.+\\.(j)sx?$': 'babel-jest',
    '^.+\\.(t)sx?$': '@swc/jest',
  },
  moduleNameMapper: {
    '^@crossed/core$': '<rootDir>/node_modules/@crossed/core/src/index',
    '^@crossed/styled$': '<rootDir>/node_modules/@crossed/styled/src/index',
    '^react-native$': 'react-native-web',
    '^react-native-reanimated$':
      '<rootDir>/node_modules/react-native-reanimated/mock',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((.pnpm/)?((jest-)?react-native|@react-native(-community)?))|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|tamagui|@tamagui/.*|@paymium/.*|react-native-reanimated|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
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
