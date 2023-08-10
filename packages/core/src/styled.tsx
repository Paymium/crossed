import type { ComponentType } from 'react';
import { forwardRef, useState } from 'react';
import { mergeui, merge } from '@mergeui/class-variance-authority';
import type { ConfigSchema as ConfigSchemaCVA } from '@mergeui/class-variance-authority';
import tw from 'twrnc';
import { Platform, StyleSheet } from 'react-native';
import type { ClassValue } from '@mergeui/class-variance-authority/src/types';
import type {
  Base,
  BaseWithState,
  ConfigSchema,
  ConfigSchemaTheme,
  Props,
  State,
  StateName,
} from './types';

const cleanForMergeui = <P, T extends ConfigSchema<P>>(
  variantsDeclaration?: ConfigSchemaTheme<P, T>
) => {
  if (!variantsDeclaration) {
    return {};
  }

  const {
    className: base,
    variants,
    defaultVariants,
    compoundVariants,
  } = variantsDeclaration;

  const config: any = {
    defaultVariants,
  };

  if (variants) {
    config.variants = Object.entries(variants).reduce<ConfigSchemaCVA>(
      (acc, [variantKey, variantValues]) => {
        const variantListT = Object.entries(variantValues).reduce<
          Record<string, ClassValue>
        >((acc2, [keyInVar, value]) => {
          acc2[keyInVar] = value.className;
          return acc2;
        }, {});
        acc[variantKey] = variantListT;
        return acc;
      },
      {}
    );
  }

  if (compoundVariants) {
    config.compoundVariants = compoundVariants.map((compoundVariant) => {
      const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        props,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ':active': active,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ':focus': focus,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ':hover': hover,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ':pressed': pressed,
        className,
        ...other
      } = compoundVariant;
      return {
        ...other,
        className,
      };
    });
  }

  return { base, config };
};

const extractStateClassName = <P, T extends ConfigSchema<P>>(
  themeConfigProps: ConfigSchemaTheme<P, T>,
  variantProps: Props<T>,
  {
    activeTheme,
    hoverTheme,
    focusTheme,
    disabledTheme,
  }: {
    activeTheme?: Base<P>;
    hoverTheme?: Base<P>;
    focusTheme?: Base<P>;
    disabledTheme?: Base<P>;
  } = {}
) => {
  const { variants, compoundVariants = [], defaultVariants } = themeConfigProps;

  const compounedVariant = compoundVariants?.reduce<{
    [key in keyof Required<State<P>>]: string[];
  }>(
    (
      acc,
      {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        'className': cvClassName,
        ':active': _activeCompoundVariant,
        ':hover': _hoverCompoundVariant,
        ':focus': _focusCompoundVariant,
        ':disabled': _disabledCompoundVariant,
        ...compoundVariantOptions
      }
    ) => {
      return Object.entries(compoundVariantOptions).every(([key, value]) =>
        Array.isArray(value)
          ? value.includes(
              {
                ...defaultVariants,
                ...variantProps,
              }[key]
            )
          : {
              ...defaultVariants,
              ...variantProps,
            }[key] === value
      )
        ? {
            ':active': [
              ...acc[':active'],
              ...(_activeCompoundVariant?.className || []),
            ],
            ':hover': [
              ...acc[':hover'],
              ...(_hoverCompoundVariant?.className || []),
            ],
            ':focus': [
              ...acc[':focus'],
              ...(_focusCompoundVariant?.className || []),
            ],
            ':disabled': [
              ...acc[':disabled'],
              ...(_disabledCompoundVariant?.className || []),
            ],
          }
        : acc;
    },
    {
      ':active': [],
      ':hover': [],
      ':focus': [],
      ':disabled': [],
    }
  );

  const result = Object.entries(variantProps).reduce<{
    [key in StateName as `${key}Classname`]: string[];
  }>(
    (acc, [keyVariant, valueVariant]) => {
      if (valueVariant !== undefined && valueVariant !== null) {
        const variantList = (variants as T)[keyVariant];

        const {
          ':active': _activeCompoundVariant,
          ':hover': _hoverCompoundVariant,
          ':focus': _focusCompoundVariant,
          ':disabled': _disabledCompoundVariant,
        } = compounedVariant;

        const {
          ':active': _active,
          ':hover': _hover,
          ':focus': _focus,
          ':disabled': _disabled,
        } = (variantList[valueVariant.toString()] ||
          {}) satisfies BaseWithState<P>;

        acc.activeClassname = [
          ...acc.activeClassname,
          ...(_active?.className || []),
          ...(_activeCompoundVariant || []),
        ];

        acc.hoverClassname = [
          ...acc.hoverClassname,
          ...(_hover?.className || []),
          ...(_hoverCompoundVariant || []),
        ];

        acc.focusClassname = [
          ...acc.focusClassname,
          ...(_focus?.className || []),
          ...(_focusCompoundVariant || []),
        ];

        acc.disabledClassname = [
          ...acc.disabledClassname,
          ...(_disabled?.className || []),
          ...(_disabledCompoundVariant || []),
        ];
      }
      return acc;
    },
    {
      activeClassname: !activeTheme?.className
        ? []
        : Array.isArray(activeTheme.className)
        ? activeTheme.className
        : [activeTheme.className],
      hoverClassname: !hoverTheme?.className
        ? []
        : Array.isArray(hoverTheme.className)
        ? hoverTheme.className
        : [hoverTheme.className],
      focusClassname: !focusTheme?.className
        ? []
        : Array.isArray(focusTheme.className)
        ? focusTheme.className
        : [focusTheme.className],
      disabledClassname: !disabledTheme?.className
        ? []
        : Array.isArray(disabledTheme.className)
        ? disabledTheme.className
        : [disabledTheme.className],
    }
  );

  return result;
};

export const styled = <
  P extends Record<string, any> = {},
  T extends ConfigSchema<P> = {}
>(
  Component: ComponentType<P>,
  themeConfigProps: ConfigSchemaTheme<P, T>
) => {
  const {
    props,
    ':active': activeTheme,
    ':focus': focusTheme,
    ':hover': hoverTheme,
    ':disabled': disabledTheme,
    ...themeConfig
  } = themeConfigProps || {};
  const { as: asTheme, ...propsTheme } = props || {};
  const variants = themeConfig?.variants || {};

  const { base, config } = cleanForMergeui<P, T>(themeConfigProps);
  const stylesClass = mergeui<T>(base, config);

  const NewComponent = forwardRef<
    any,
    Props<T> &
      P & {
        className?: string;
        as?: string | ComponentType;
        states?: { isActive?: boolean; isFocus?: boolean; isHover?: boolean };
      }
  >(({ as: asProps, className, disabled, states, ...props }, ref) => {
    const [active, setActive] = useState(false);
    const [hover, setHover] = useState(false);
    const [focus, setFocus] = useState(false);

    const variantNames = Object.keys(variants) as (keyof T)[];
    const { componentProps, variantProps } = Object.entries(props).reduce<{
      componentProps: P;
      variantProps: Props<T>;
    }>(
      (acc, [propsName, valueProps]) => {
        if (variantNames.includes(propsName)) {
          acc.variantProps[propsName as keyof Props<T>] = valueProps;
        } else {
          (acc.componentProps as any)[propsName] = valueProps;
        }
        return acc;
      },
      { componentProps: {}, variantProps: {} } as any
    );

    const { as: asVariant, ...propsVariant } = Object.entries(
      variantProps
    ).reduce<any>((acc, [keyVariant, valueVariant]) => {
      if (valueVariant !== undefined && valueVariant !== null) {
        const variantList = (variants as any)[keyVariant];
        const classNameTmp =
          variantList[valueVariant.toString()]?.className || [];
        return {
          ...acc,
          className: classNameTmp,
        };
      }
      return acc;
    }, {});

    const {
      activeClassname = [],
      hoverClassname = [],
      focusClassname = [],
      disabledClassname = [],
    } = extractStateClassName(themeConfigProps, variantProps, {
      activeTheme,
      focusTheme,
      hoverTheme,
      disabledTheme,
    });

    const asPropsOrTheme = asProps || asVariant || asTheme || undefined;
    const AsComp = (
      Platform.OS === 'web' ? asPropsOrTheme || Component : Component
    ) as any;

    const finalClassName = merge(
      stylesClass(variantProps as any).split(' '),
      className,
      ...(states?.isFocus || focus ? focusClassname : []),
      ...(states?.isHover || hover ? hoverClassname : []),
      ...(states?.isActive || active ? activeClassname : []),
      ...(disabled ? disabledClassname : [])
    );

    const propsTmp =
      Platform.OS === 'web'
        ? asPropsOrTheme
          ? {
              className: finalClassName,
            }
          : {
              style: StyleSheet.create({
                root: {
                  $$css: true,
                  ...finalClassName.split(' ').reduce<any>((acc, className) => {
                    acc[`___${className}`] = className;
                    return acc;
                  }, {}),
                },
              }).root,
            }
        : { style: tw.style(finalClassName) };
    // console.log(
    //   { ...propsTheme },
    //   { ...propsVariant },
    //   { ...propsTmp },
    //   { ...componentProps }
    // );
    return (
      <AsComp
        ref={ref}
        onPressIn={(e: any) => {
          componentProps?.onPressIn?.(e);
          setActive(true);
        }}
        onPressOut={(e: any) => {
          componentProps?.onPressOut?.(e);
          setActive(false);
        }}
        onBlur={(e: any) => {
          componentProps?.onBlur?.(e);
          setFocus(false);
        }}
        onFocus={(e: any) => {
          componentProps?.onFocus?.(e);
          setFocus(true);
        }}
        onPointerOver={(e: any) => {
          componentProps?.onPointerOver?.(e);
          setHover(true);
        }}
        onPointerOut={(e: any) => {
          componentProps?.onPointerOut?.(e);
          setHover(false);
        }}
        {...propsTheme}
        {...propsVariant}
        {...propsTmp}
        {...componentProps}
      />
    );
  });
  // @ts-check
  // NewComponent.styles = stylesClass;
  return [NewComponent, stylesClass] as const;
};
