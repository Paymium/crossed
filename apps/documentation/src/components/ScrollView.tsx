/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { ScrollView as NScrollView, ScrollViewProps } from 'react-native';

export const ScrollView = (props: ScrollViewProps) => (
  <NScrollView {...props} />
);
