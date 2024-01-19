/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

export type GenericPrimitiveConfig = {
  requireAccessibility: true;
};

export interface PrimitiveCustomConfig {}
export interface PrimitiveConfig
  extends Omit<GenericPrimitiveConfig, keyof PrimitiveCustomConfig>,
    PrimitiveCustomConfig {}

export type RequiredAccessibilityProps<
  P,
  F extends keyof P
> = PrimitiveConfig['requireAccessibility'] extends true
  ? Omit<P, F> & Pick<Required<P>, F>
  : P;
