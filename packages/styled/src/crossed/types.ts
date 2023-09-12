import type * as CLSX from 'clsx';

export type ClassPropKey = 'class' | 'className';

export type ClassValue = CLSX.ClassValue;
export type ClassArray = CLSX.ClassArray;

export type ClassProp =
  | {
      class: ClassValue;
      className?: never;
    }
  | { class?: never; className: ClassValue }
  | { class?: never; className?: never };

export type OmitUndefined<T> = T extends undefined ? never : T;
export type StringToBoolean<T> = T extends 'true' | 'false' ? boolean : T;

export type StateName = 'focus' | 'hover' | 'disabled' | 'active';
export type ThemeName = 'dark' | 'light';

export type PropsExtends<P> = P & { as?: any };

export type Base<P> = {
  className?: string[];
  props?: PropsExtends<P>;
};

export type BaseWithState<P> = State<P> & Theme<P> & Base<P>;

export type State<P> = {
  [key in StateName as `:${key}`]?: Base<P> & Theme<P>;
};

export type Theme<P> = {
  [key in ThemeName as `:${key}`]?: Base<P>;
};

export type ConfigSchema<P> = Record<string, Record<string, BaseWithState<P>>>;

export type ConfigVariants<T extends ConfigSchema<any>> = {
  [Variant in keyof T]?: StringToBoolean<keyof T[Variant]> | null | undefined;
};
export type ConfigVariantsMulti<P extends object, T extends ConfigSchema<P>> = {
  [Variant in keyof T]?:
    | StringToBoolean<keyof T[Variant]>
    | StringToBoolean<keyof T[Variant]>[]
    | undefined;
};

export type Config<
  P extends object,
  T extends ConfigSchema<P>
> = BaseWithState<P> & {
  variants?: T;
  defaultVariants?: ConfigVariants<T>;
  compoundVariants?: (T extends ConfigSchema<P>
    ? (ConfigVariants<T> | ConfigVariantsMulti<P, T>) & BaseWithState<P>
    : BaseWithState<P>)[];
};

export type Props<T, P extends object> = T extends ConfigSchema<P>
  ? ConfigVariants<T> & BaseWithState<P>
  : BaseWithState<P>;
