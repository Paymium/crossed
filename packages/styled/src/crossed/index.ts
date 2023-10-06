import { merge } from './merge';
import type {
  BaseWithState,
  Config,
  ConfigSchemaUndefined,
  OmitUndefined,
  Props,
} from '@crossed/core';

export type VariantProps<Component extends (...args: any) => any> = Omit<
  OmitUndefined<Parameters<Component>[0]>,
  'class' | 'className'
>;

const falsyToString = <T>(value: T) =>
  typeof value === 'boolean' ? `${value}` : value === 0 ? '0' : value;

export const crossed =
  <
    T extends ConfigSchemaUndefined<any> = ConfigSchemaUndefined<any>,
    P extends Record<string, any> = any
  >(
    config?: Config<P, T, any>
  ) =>
  (props?: Props<T, P>) => {
    if (config?.variants == null) {
      return config as BaseWithState<P>;
    }

    const {
      className: classNameBase,
      props: propsBase,
      [':active']: activeBase,
      [':focus']: focusBase,
      [':hover']: hoverBase,
      [':disabled']: disabledBase,
      [':dark']: darkBase,
      [':light']: lightBase,
      variants,
      defaultVariants,
    } = config;

    const getVariantClassNames = Object.entries(variants).map(
      ([variant, variantValue]) => {
        const variantProp = props?.[variant as keyof typeof props];
        const defaultVariantProp = (defaultVariants as any)?.[variant];

        if (variantProp === null) return null;

        const variantKey = (falsyToString(variantProp) ||
          falsyToString(defaultVariantProp)) as keyof typeof variantValue;

        return variantValue[variantKey];
      }
    );

    const propsWithoutUndefined =
      props &&
      Object.entries(props).reduce((acc, [key, value]) => {
        if (value === undefined) {
          return acc;
        }

        acc[key] = value;
        return acc;
      }, {} as Record<string, unknown>);

    const getCompoundVariantClassNames = config?.compoundVariants?.reduce(
      (acc, v) => {
        const {
          className: classNameCompoundVariant,
          props: propsCompoundVariant,
          [':active']: activeCompoundVariant,
          [':focus']: focusCompoundVariant,
          [':hover']: hoverCompoundVariant,
          [':disabled']: disabledCompoundVariant,
          [':dark']: darkCompoundVariant,
          [':light']: lightCompoundVariant,
          ...compoundVariantOptions
        } = v;

        const check = Object.entries(compoundVariantOptions).every(
          ([key, value]) => {
            return Array.isArray(value)
              ? value.includes(
                  {
                    ...(defaultVariants || {}),
                    ...(propsWithoutUndefined || {}),
                  }[key] as any
                )
              : {
                  ...defaultVariants,
                  ...propsWithoutUndefined,
                }[key] === value;
          }
        );

        if (check) {
          return merge(acc, {
            className: classNameCompoundVariant,
            props: propsCompoundVariant,
            [':active']: activeCompoundVariant,
            [':focus']: focusCompoundVariant,
            [':hover']: hoverCompoundVariant,
            [':disabled']: disabledCompoundVariant,
            [':dark']: darkCompoundVariant,
            [':light']: lightCompoundVariant,
          });
        }
        return acc;
      },
      {} as BaseWithState<P>
    );

    return [
      {
        'props': propsBase,
        'className': classNameBase,
        ':active': activeBase,
        ':focus': focusBase,
        ':hover': hoverBase,
        ':disabled': disabledBase,
        ':dark': darkBase,
        ':light': lightBase,
      },
      ...getVariantClassNames,
      getCompoundVariantClassNames,
      props,
    ].reduce<BaseWithState<P>>((acc, check) => {
      if (!check) {
        return acc;
      }

      return merge(acc, check);
    }, {} as BaseWithState<P>);
  };
