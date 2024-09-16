/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  BasePlugin,
  MediaQueriesPlugin,
  PseudoClassPlugin,
  WebPlugin,
} from '../plugins';
export { Registry } from './Registry';
export { parse } from './RegistryBridge';
import { Registry } from './Registry';
import { breakpoints } from './breakpoints';

export { breakpoints };

Registry.addPlugin(BasePlugin)
  .addPlugin(PseudoClassPlugin)
  .addPlugin(WebPlugin)
  .addPlugin(MediaQueriesPlugin(breakpoints));
