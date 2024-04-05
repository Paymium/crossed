/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type {
  CrossedMethods,
  CrossedPropsExtended,
  PluginContext,
  Themes,
} from './types';
import { Registry } from './Registry';

export const createStyles = <C extends string, S>(
  stylesParam: (_theme: Themes[keyof Themes]) => Record<C, S>
) => {
  const results = stylesParam(Registry.getTheme());
  const apply = (
    style: Record<string, any>,
    props: CrossedPropsExtended<S>,
    addClassname: PluginContext<S>['addClassname']
  ) => {
    Registry.apply(() => style, {
      isWeb: true,
      props,
      addClassname,
    });
  };

  return Object.entries(results).reduce<
    Record<C, CrossedMethods<CrossedPropsExtended<S>>>
  >((acc, [keyStyle, styleOfKey]: [C, S]) => {
    acc[keyStyle] = {
      style: (props: CrossedPropsExtended<S> = {}) => {
        let style = {} as any;
        apply(
          {
            ...styleOfKey,
            base: { ...(styleOfKey as any).base, ...props.style },
          },
          props,
          ({ body }) => {
            style = {
              ...style,
              ...Object.values(body).reduce((acc, e) => ({ ...acc, ...e }), {}),
            };
          }
        );
        return { style };
      },
      className: (props: CrossedPropsExtended<S> = {}) => {
        const classNames: string[] = props.className
          ? props.className.split(' ')
          : [];
        apply(
          {
            ...styleOfKey,
            base: { ...(styleOfKey as any).base, ...props.style },
          },
          props,
          ({ body }) => {
            classNames.push(...Object.keys(body));
          }
        );
        return {
          className: classNames.join(' '),
        };
      },
      rnw: (props: CrossedPropsExtended<S> = {}) => {
        const classNames: string[] = props.className
          ? props.className.split(' ')
          : [];
        apply(
          {
            ...styleOfKey,
            base: { ...(styleOfKey as any).base, ...props.style },
          },
          props,
          ({ body }) => {
            classNames.push(...Object.keys(body));
          }
        );
        return {
          style: classNames.reduce<Record<string, any>>(
            (acc2, cl) => {
              acc2[cl] = cl;
              return acc2;
            },
            { $$css: true }
          ),
        };
      },
    };
    return acc;
  }, {} as any) as Record<C, CrossedMethods<CrossedPropsExtended<S>>>;
};
