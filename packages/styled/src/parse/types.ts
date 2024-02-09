/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

export type Parse = (_params: {
  params?: Record<string, any>;
  media?: string;
  pseudo?: string;
  props?: Record<string, any>;
}) => { className: string; style: Record<string, any> };
