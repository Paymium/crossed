import type { ComponentType } from 'react';
import React from 'react';
import { mergeui, merge } from '@mergeui/class-variance-authority';
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

type BaseStyle<P> = {
  styles?: ClassValue;
  props?: P & { as?: string | ComponentType };
};

type Toto<T> = T extends undefined
  ? {}
  : {
      [key in keyof T]?: StringToBoolean<keyof T[key]> | null | undefined;
    };

export const styled = <P, T extends ConfigSchema = {}>(
  Component: ComponentType<P>,
  themeConfigProps: {
    base: BaseStyle<P>;
    variants?: T;
    defaultVariants?: ConfigVariants<T>;
    compoundVariants?: (T extends ConfigSchema
      ? (ConfigVariants<T> | ConfigVariantsMulti<T>) & ClassProp
      : ClassProp)[];
  }
) => {
  const { base, ...themeConfig } = themeConfigProps || {};
  const { as: asTheme, ...propsTheme } = base?.props || {};
  const variants = themeConfig?.variants || {};

  const finalVariant = Object.keys(variants).reduce<any>((acc, keyVariant) => {
    const variantList = (variants as any)[keyVariant] || {};
    const variantListT = Object.keys(variantList).reduce<any>((acc2, toto) => {
      acc2[toto] = variantList[toto].styles;
      return acc2;
    }, {});
    acc[keyVariant] = variantListT;
    return acc;
  }, {});

  const stylesClass = mergeui<T>(base?.styles || [], {
    ...themeConfig,
    variants: finalVariant,
  } as unknown as Config<T>);

  const NewComponent = ({
    as: asProps,
    className,
    ...props
  }: Toto<T> & P & { className?: string; as?: string | ComponentType }) => {
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

    const { as: asVariant, ...propsVariant } = Object.keys(
      variantProps
    ).reduce<any>((acc, keyVariant) => {
      const valueVariant = (variantProps as any)[keyVariant];
      if (valueVariant !== undefined) {
        const variantList = (variants as any)[keyVariant];

        const { props } =
          (variantList as any)[
            valueVariant === true ? valueVariant.toString() : valueVariant
          ] || {};
        return { ...acc, ...props };
      }
      return acc;
    }, {});

    const asPropsOrTheme = asProps || asVariant || asTheme || undefined;
    const AsComp = (
      Platform.OS === 'web' ? asPropsOrTheme || Component : Component
    ) as any;

    const propsTmp =
      Platform.OS === 'web'
        ? asPropsOrTheme
          ? {
              className: merge(stylesClass(variantProps).split(' '), className),
            }
          : {
              style: StyleSheet.create({
                root: {
                  $$css: true,
                  ...merge(...stylesClass(variantProps).split(' '), className)
                    .split(' ')
                    .reduce<any>((acc, className) => {
                      acc[`___${className}`] = className;
                      return acc;
                    }, {}),
                },
              }).root,
            }
        : { style: tw.style(stylesClass(variantProps)) };
    return (
      <AsComp
        {...propsTheme}
        {...propsVariant}
        {...propsTmp}
        {...componentProps}
      />
    );
  };
  // @ts-check
  // NewComponent.styles = stylesClass;
  return [NewComponent, stylesClass] as const;
};
