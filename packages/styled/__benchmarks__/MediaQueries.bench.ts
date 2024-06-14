/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { benchmarkSuite } from 'jest-bench';
import { MediaQueriesPlugin } from '../src/plugins/MediaQueries';
import { breakpoints } from '../src/Registry/breakpoints';

const a = MediaQueriesPlugin(breakpoints);
benchmarkSuite('MediaQueriesPlugin', {
  ['apply']: () => {
    a.apply?.({
      styles: {
        lg: {},
        md: {},
        sm: {},
        xl: {},
        xs: {},
      },
      addClassname: () => {},
      key: 'media',
      isWeb: true,
      props: {},
    });
  },
});
