/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  ComponentPropsWithoutRef,
  forwardRef,
  memo,
  RefAttributes,
} from 'react';
import { SectionList as SL } from '@crossed/sheet';
import { SectionList as RNSL } from 'react-native';
import '@crossed/sheet';
import 'react-native';

type SectionListProps = ComponentPropsWithoutRef<typeof RNSL<any>> & {
  padded?: boolean;
};
export const SectionList = memo<
  SectionListProps & RefAttributes<typeof RNSL<any>>
>(forwardRef((props, ref) => <SL {...(props as any)} ref={ref as any} />));
SectionList.displayName = 'Sheet.SectionList';
