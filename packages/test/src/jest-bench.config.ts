/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Config } from '@jest/types';
import { default as configDefault } from './jest.config';

const config: Config.InitialOptions = {
  ...configDefault,
  testRegex: '(/__benchmarks__/.*|\\.bench)\\.(ts|tsx|js)$',
  reporters: ['default', 'jest-bench/reporter'],
  testEnvironmentOptions: {
    // still Jest-bench environment will run your environment if you specify it here
    testEnvironment: 'jest-environment-node',
    testEnvironmentOptions: {
      // specify any option for your environment
    },
  },
  setupFilesAfterEnv: [],
  testEnvironment: 'jest-bench/environment',
};

export default config;
