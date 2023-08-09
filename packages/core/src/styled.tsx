import type { ComponentType } from 'react';
import React from 'react';
import { mergeui, cx } from '@mergeui/class-variance-authority';
import type {
  Props,
  ConfigSchema,
  Config,
  ConfigVariants,
  ConfigVariantsMulti,
} from '@mergeui/class-variance-authority';
import tw from 'twrnc';
import { Platform, StyleSheet } from 'react-native';
import type {
  ClassProp,
  ClassValue,
  StringToBoolean,
} from '@mergeui/class-variance-authority/src/types';

type NewProps<T extends ConfigSchema, P> = Props<T> & P;

export const styled = <P, T extends ConfigSchema>(
  Component: ComponentType<P>,
  themeConfigProps: {
    base: {
      styles: ClassValue;
      props?: P & { as?: string | ComponentType };
    };
    variants?: T;
    defaultVariants?: ConfigVariants<T>;
    compoundVariants?: (T extends ConfigSchema
      ? (ConfigVariants<T> | ConfigVariantsMulti<T>) & ClassProp
      : ClassProp)[];
  }
) => {
  const { base, ...themeConfig } = themeConfigProps || {};
  const { as: asTheme, ...propsTheme } = base?.props || {};

  const stylesClass = mergeui<T>(
    base?.styles || [],
    themeConfig as unknown as Config<T>
  );

  const NewComponent = ({
    as: asProps,
    className,
    ...props
  }: P & {
    [key in keyof T]?: StringToBoolean<keyof T[key]> | null | undefined;
  } & { className?: string }) => {
    // {
    //   [Variant in keyof T]?: StringToBoolean<keyof T[Variant]> | null | undefined;
    // }
    const variants = themeConfig?.variants || {};
    const variantNames = Object.keys(variants);
    const { componentProps, variantProps } = Object.keys(props as any).reduce<{
      componentProps: P;
      variantProps: Props<T>;
    }>(
      (acc, propsName) => {
        if (variantNames.includes(propsName)) {
          (acc.variantProps as any)[propsName] = (props as any)[propsName];
        } else {
          (acc.componentProps as any)[propsName] = (props as any)[propsName];
        }
        return acc;
      },
      { componentProps: {} as P, variantProps: {} as Props<T> }
    );

    const asPropsOrTheme = asProps || asTheme || undefined;
    const AsComp = (
      Platform.OS === 'web' ? asPropsOrTheme || Component : Component
    ) as any;

    const propsTmp =
      Platform.OS === 'web'
        ? asPropsOrTheme
          ? {
              className: cx(stylesClass(variantProps), className),
            }
          : {
              style: StyleSheet.create({
                root: {
                  $$css: true,
                  ...cx(stylesClass(variantProps), className)
                    .split(' ')
                    .reduce<any>((acc, className) => {
                      acc[`___${className}`] = className;
                      return acc;
                    }, {}),
                },
              }).root,
            }
        : { style: tw.style(stylesClass(variantProps)) };
    return <AsComp {...propsTheme} {...propsTmp} {...componentProps} />;
  };
  // NewComponent.styles = styles;
  return NewComponent;
};
