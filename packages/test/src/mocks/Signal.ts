/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

export class Signal {
  private _value: boolean;
  constructor(e: boolean) {
    this._value = e;
  }
  get value() {
    return this._value;
  }
  set value(e) {
    this._value = e;
  }
}
