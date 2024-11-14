/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withStaticProperties } from '@crossed/core';
import { SelectRoot } from './Root';
import { SelectContent } from './Content';
import { SelectTrigger } from './Trigger';
import { SelectValue } from './Value';
import { SelectOption } from './Option';

export const SelectNew = withStaticProperties(SelectRoot, {
  Content: SelectContent,
  Trigger: SelectTrigger,
  Value: SelectValue,
  Option: SelectOption,
});
export { SelectContent, SelectTrigger, SelectValue, SelectOption };
