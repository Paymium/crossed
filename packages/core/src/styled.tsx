import type { ComponentType } from 'react';
import React from 'react';
import { mergeui } from '@mergeui/class-variance-authority';
import type {
  Props,
  ConfigSchema,
  Config,
} from '@mergeui/class-variance-authority';
import type { ClassValue } from '@mergeui/class-variance-authority/dist/types';
import tw from 'twrnc';
import { Platform } from 'react-native';

type NewProps<P, T> = P & Props<T>;

type ThemeConfig<P> = {
  base: {
    styles: string[];
    props?: P & { as?: string | ComponentType };
  };
  variants: any
};

export const styled = <P extends {}, T extends ConfigSchema>(
  Component: ComponentType<P>,
  themeConfig: ThemeConfig<P>
) => {
  const { base } = themeConfig || {};
  const { as: asTheme, ...propsTheme } = base?.props || {};
  const stylesClass = mergeui<T>(base?.styles || [], themeConfig as any);

  const NewComponent = ({ as: asProps, ...props }: NewProps<P, T>) => {
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
    const AsComp: any = (asProps as any) || (asTheme as any) || Component;

    const propsTmp =
      Platform.OS === 'web'
        ? { className: stylesClass(variantProps) }
        : { style: tw.style(stylesClass(variantProps)) };
    return <AsComp {...propsTheme} {...propsTmp} {...componentProps} />;
  };
  // NewComponent.styles = styles;
  return NewComponent;
};
