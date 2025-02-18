/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createContext } from 'react';

export type Context = {
  add: (_name: string, _r: any) => void;
  onFocus: (_name: string) => void;
  onBlur: () => void;
  value: { day: number; month: number; year: number };
  onChange: (_name: string, _value: number) => void;
};
export const context = createContext<Context>({} as Context);
