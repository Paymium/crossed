import { withStaticProperties } from '@mergeui/core';
import { SelectRoot } from './Root';
import { SelectOption } from './Option';

export const Select = withStaticProperties(SelectRoot, { Option: SelectOption});
