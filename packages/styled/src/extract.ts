import type { UnistylesValues } from 'react-native-unistyles/lib/typescript/src/types/stylesheet';
import type { ExtractUnistylesValues, UnistylesValuesExtends } from './types';

export type ReturnExtract = ExtractUnistylesValues & { base: UnistylesValues };

const stateToExtract = [
  'checked:',
  'readOnly:',
  'required:',
  'invalid:',
  'focus:',
  'focusVisible:',
  'hover:',
  'pressed:',
  'active:',
  'loading:',
  'disabled:',
];

export const extract = (p: Partial<UnistylesValuesExtends>): ReturnExtract => {
  return Object.entries(p).reduce<ReturnExtract>(
    (acc, [key, value]) => {
      if (
        (key === 'variants' || !stateToExtract.includes(key)) &&
        typeof value === 'object'
      ) {
        Object.entries(extract(value as any)).forEach(([k, v]) => {
          (acc as any)[k][key] = v;
        });
      }
      if (stateToExtract.includes(key) && typeof value === 'object') {
        (acc as any)[key.replace(':', '')] = value as any;
      }
      if (!stateToExtract.includes(key)) {
        (acc.base as any)[key] =
          typeof value === 'object' ? extract(value as any).base : value;
      }
      return acc;
    },
    {
      base: {},
      checked: {},
      readOnly: {},
      required: {},
      invalid: {},
      focus: {},
      focusVisible: {},
      hover: {},
      pressed: {},
      active: {},
      loading: {},
      disabled: {},
    }
  );
};
