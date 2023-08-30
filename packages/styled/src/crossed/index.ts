import type {
  Base,
  BaseWithState,
  Config,
  ConfigSchema,
  OmitUndefined,
  Props,
  PropsExtends,
} from './types';
import { twMerge } from 'tailwind-merge';

export type VariantProps<Component extends (...args: any) => any> = Omit<
  OmitUndefined<Parameters<Component>[0]>,
  'class' | 'className'
>;

const falsyToString = <T extends unknown>(value: T) =>
  typeof value === 'boolean' ? `${value}` : value === 0 ? '0' : value;

export const crossed =
  <P extends object, T extends ConfigSchema<P>>(config?: Config<P, T>) =>
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
      variants,
      defaultVariants,
    } = config;

    const getVariantClassNames = Object.entries(variants).map(
      ([variant, variantValue]) => {
        const variantProp = props?.[variant as keyof typeof props];
        const defaultVariantProp = defaultVariants?.[variant];

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

const deepMerge = <P>(one?: Base<P>, two?: Base<P>): Base<P> => {
  const tmp = {
    ...one,
    ...two,
    className: twMerge(one?.className, two?.className).split(' '),
  };
  if (one?.props || two?.props) {
    tmp.props = { ...one?.props, ...two?.props } as PropsExtends<P>;
  }
  return tmp;
};

export const merge = <P>(
  one: BaseWithState<P>,
  two: BaseWithState<P>
): BaseWithState<P> => {
  const acc: BaseWithState<P> = one;
  if (two[':active']) {
    acc[':active'] = deepMerge(one[':active'], two[':active']);
  }
  if (two[':disabled']) {
    acc[':disabled'] = deepMerge(one[':disabled'], two[':disabled']);
  }
  if (two[':focus']) {
    acc[':focus'] = deepMerge(one[':focus'], two[':focus']);
  }
  if (two[':hover']) {
    acc[':hover'] = deepMerge(one[':hover'], two[':hover']);
  }
  if (two[':dark']) {
    acc[':dark'] = deepMerge(one[':dark'], two[':dark']);
  }
  if (one.props || two.props) {
    one.props = { ...acc.props, ...two.props } as PropsExtends<P>;
  }

  return {
    ...one,
    className: twMerge([
      ...(acc.className || []),
      ...(two.className || []),
    ]).split(' '),
  };
};
