/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { CrossedstyleTheme } from './types';

class RegistryBridge {
  private theme?: CrossedstyleTheme;

  setTheme(t: CrossedstyleTheme) {
    this.theme = t;
    return this;
  }
  getTheme() {
    return this.theme as CrossedstyleTheme;
  }
}

export const Registry = new RegistryBridge();
