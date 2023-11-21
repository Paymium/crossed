#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const path = require('node:path');

process.argv.push(
  '--config',
  path.resolve(__dirname, 'jest.config.ts'),
  '--coverage'
);

require('jest/bin/jest');
