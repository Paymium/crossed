import type { ComponentType } from 'react';
import React from 'react';
import { cva } from '@mergeui/class-variance-authority';
import type {
  Props,
  ConfigSchema,
  Config,
} from '@mergeui/class-variance-authority';
import type { ClassValue } from '@mergeui/class-variance-authority/dist/types';
import tw from 'twrnc';

type NewProps<P, T> = P & Props<T>;

export const styled = <P extends {}, T extends ConfigSchema>(
  Component: ComponentType<P>,
  base: ClassValue,
  themeConfig?: Config<T>
) => {
  const styles = cva<T>(base, themeConfig as any);
  const NewComponent = (props: NewProps<P, T>) => {
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
    return (
      <Component {...componentProps} style={tw.style(styles(variantProps))} />
    );
  };
  // NewComponent.styles = styles;
  return NewComponent;
};
