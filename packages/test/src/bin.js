#!/usr/bin/env node
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('node:path');
process.argv.push(
  '--config',
  path.resolve(__dirname, 'jest.config.ts'),
  '--roots',
  path.resolve(process.cwd()),
  // '--collectCoverageFrom',
  // path.resolve(process.cwd(), '/**/*.[jt]s?(x)'),
  // '--coverageDirectory',
  path.resolve(process.cwd(), 'coverage'),
  '--coverage'
);
require('jest/bin/jest');
