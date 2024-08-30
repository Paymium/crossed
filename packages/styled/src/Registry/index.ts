/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { BasePlugin, MediaQueriesPlugin, PseudoClassPlugin } from '../plugins';
import { Registry } from './Registry';
import { breakpoints } from './breakpoints';

export { breakpoints };

Registry.addPlugin(BasePlugin)
  .addPlugin(PseudoClassPlugin)
  .addPlugin(MediaQueriesPlugin(breakpoints));

export { Registry } from './Registry';
export { parse } from './RegistryBridge';
