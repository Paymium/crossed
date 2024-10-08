/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withDefaultProps, withStaticProperties } from '@crossed/core';
import { Root } from './Root';
import { Trigger } from './Trigger';
import { Frame } from './Frame';
import { SnapVisible } from './SnapVisible';
import { SheetTitle } from './Title';
import { SheetHeader } from './Header';
import { XBox } from '../../layout/XBox';

const SheetFooter = withDefaultProps(XBox, {
  justifyContent: 'end',
  space: 'xs',
});
SheetFooter.displayName = 'Sheet.Footer';

export const Sheet = withStaticProperties(Root, {
  Trigger,
  Frame,
  SnapVisible,
  Title: SheetTitle,
  Header: SheetHeader,
  Footer: SheetFooter,
});
