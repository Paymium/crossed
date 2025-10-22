#!/usr/bin/env node
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('node:path');
const jest = require('jest');

const argv = [
  '--config',
  path.resolve(__dirname, 'jest.config.ts'),
  '--collectCoverageFrom',
  '**/*.[jt]s?(x)',
  '--coverage',
];

jest.run(argv);
