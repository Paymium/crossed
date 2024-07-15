/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { StyleSheet } from './types';

export class CrossedStyle {
  private _value: string | number;
  public _original: StyleSheet;
  constructor(v: string | number) {
    this._value = v;
  }

  get() {
    return this._value;
  }
}
