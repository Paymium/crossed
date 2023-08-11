import type {
  ConfigVariants,
  ConfigVariantsMulti,
} from '@mergeui/class-variance-authority';

import type { StringToBoolean } from '@mergeui/class-variance-authority/src/types';
import type { ComponentType } from 'react';

export type Base<P> = {
  className?: string[];
  props?: P & { as?: string | ComponentType };
};

export type StateName = 'focus' | 'hover' | 'disabled' | 'active';

export type State<P> = {
  [key in StateName as `:${key}`]?: Base<P>;
};

export type BaseWithState<P> = State<P> & Base<P>;

export type Props<T> = T extends undefined
  ? {}
  : {
      [key in keyof T]?: StringToBoolean<keyof T[key]> | undefined;
    };

export type ConfigSchema<P> = Record<string, Record<string, BaseWithState<P>>>;

export type CompounedVariant<
  P,
  T extends ConfigSchema<P>
> = T extends ConfigSchema<P>
  ? (ConfigVariants<T> | ConfigVariantsMulti<T>) & BaseWithState<P>
  : BaseWithState<P>;

export type CVAThemed<P, T extends ConfigSchema<P>> = {
  variants?: T;
  defaultVariants?: ConfigVariants<T>;
  compoundVariants?: CompounedVariant<P, T>[];
};

export type ConfigSchemaTheme<P, T extends ConfigSchema<P>> = BaseWithState<P> &
  CVAThemed<P, T>;
