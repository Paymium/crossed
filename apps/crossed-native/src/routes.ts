/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  '/accordion': undefined;
  '/alert': undefined;
  '/banner': undefined;
  '/button': undefined;
  '/checkbox': undefined;
  '/index': undefined;
  '/input': undefined;
  '/radio': undefined;
  '/select': undefined;
  '/sheet': undefined;
  '/tooltip': undefined;
  '/modal': undefined;
};

export type AccordionScreenProps = NativeStackScreenProps<
  RootStackParamList,
  '/accordion'
>;
export type AlertScreenProps = NativeStackScreenProps<
  RootStackParamList,
  '/alert'
>;
export type BannerScreenProps = NativeStackScreenProps<
  RootStackParamList,
  '/banner'
>;
export type ButtonScreenProps = NativeStackScreenProps<
  RootStackParamList,
  '/button'
>;
export type CheckboxScreenProps = NativeStackScreenProps<
  RootStackParamList,
  '/checkbox'
>;
export type IndexScreenProps = NativeStackScreenProps<
  RootStackParamList,
  '/index'
>;
export type InputScreenProps = NativeStackScreenProps<
  RootStackParamList,
  '/input'
>;
export type RadioScreenProps = NativeStackScreenProps<
  RootStackParamList,
  '/radio'
>;
export type SelectScreenProps = NativeStackScreenProps<
  RootStackParamList,
  '/select'
>;
