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
// export { SelectContent, SelectTrigger, SelectValue, SelectOption };
