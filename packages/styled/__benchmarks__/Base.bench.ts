/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { benchmarkSuite } from 'jest-bench';
import { BasePlugin } from '../src/plugins/Base';

const a = BasePlugin;
const cache = new Map();

benchmarkSuite('BasePlugin', {
  ['apply']: () => {
    a.apply?.({
      key: 'base',
      styles: { color: 'toto', backgroundColor: 'tiit', padding: 0 },
      addClassname: () => {},
      isWeb: true,
      cache,
    });
  },
});
