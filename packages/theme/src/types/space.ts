/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

export type SpaceName = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type Spaces = Record<SpaceName, number>;

export type PrimitiveSPaceName =
  | 0
  | 0.5
  | 1
  | 1.5
  | 2
  | 3
  | 4
  | 5
  | 6
  | 8
  | 10
  | 12
  | 16
  | 20
  | 24
  | 32
  | 40
  | 48
  | 56
  | 64
  | 80
  | 96
  | 120
  | 140
  | 160
  | 180
  | 192
  | 256
  | 320
  | 360
  | 400
  | 480;
export type PresetSpaceName =
  | 'none'
  | 'xxs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | '8xl'
  | '9xl'
  | '10xl'
  | '11xl';
export type PresetSpace = Record<PresetSpaceName, number>;
export type PrimitiveSpace = Record<PrimitiveSPaceName, number>;
