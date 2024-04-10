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
import { isWeb } from './isWeb';

const cleanClassName = (classNames: string[]) => {
  return classNames.reduce((acc, className) => {
    const [property] = className.match(/^([a-z\-:]+)/g) || [];

    if (property) {
      acc.forEach((accKey) => {
        const [same] = accKey.match(new RegExp(`^${property}`, 'g')) || [];
        if (same) {
          acc.delete(accKey);
        }
      });
    }
    acc.add(className);
    return acc;
  }, new Set<string>());
};

const apply = <S>(
  style: Record<string, any>,
  props: CrossedPropsExtended<S>,
  addClassname: PluginContext<S>['addClassname']
) => {
  Registry.apply(() => style, {
    isWeb,
    props,
    addClassname,
  });
};

const createMethods = <S>(styleOfKey: Record<string, any>) => {
  return {
    style: (props: CrossedPropsExtended<S> = {}) => {
      let style = {} as any;
      const parentStyle = (
        Array.isArray(props.style) ? props.style : [props.style]
      ).reduce((acc, st) => {
        if (!st || st.$$css) return acc;
        if (!st.$$css) {
          acc = { ...acc, ...st };
        }
        return acc;
      }, {});
      apply(styleOfKey, props, ({ body, suffix, wrapper, prefix }) => {
        if (!suffix && !wrapper && !prefix) {
          style = {
            ...style,
            ...Object.values(body).reduce((acc, e) => ({ ...acc, ...e }), {}),
          };
        }
      });
      return {
        style: {
          ...style,
          ...parentStyle,
        },
      };
    },
    className: (props: CrossedPropsExtended<S> = {}) => {
      const classNames: string[] = props.className
        ? props.className.split(' ')
        : [];
      const parentStyle = (
        Array.isArray(props.style) ? props.style : [props.style]
      ).reduce((acc, st) => {
        if (!st) return acc;
        if (!st.$$css) {
          acc = { ...acc, ...st };
        } else if (st.$$css) {
          const { $$css, ...otherClassName } = st;
          classNames.push(...Object.keys(otherClassName));
        }
        return acc;
      }, {});
      apply(
        {
          ...styleOfKey,
          base: { ...(styleOfKey as any).base, ...parentStyle },
        },
        props,
        ({ body }) => {
          classNames.push(...Object.keys(body));
        }
      );
      return {
        className: Array.from(cleanClassName(classNames).values()).join(' '),
      };
    },
    rnw: (props: CrossedPropsExtended<S> = {}) => {
      let style = {} as any;
      const classNames: string[] = props.className
        ? props.className.split(' ')
        : [];
      const parentStyle = (
        Array.isArray(props.style) ? props.style : [props.style]
      ).reduce((acc, st) => {
        if (!st) return acc;
        if (!st.$$css) {
          acc = { ...acc, ...st };
        }
        return acc;
      }, {});
      apply(
        {
          ...styleOfKey,
          base: { ...(styleOfKey as any).base, ...parentStyle },
        },
        props,
        ({ body }) => {
          style = {
            ...style,
            ...Object.values(body).reduce((acc, e) => ({ ...acc, ...e }), {}),
          };
          classNames.push(...Object.keys(body));
        }
      );

      (Array.isArray(props.style) ? props.style : [props.style]).forEach(
        (st) => {
          if (st && st.$$css) {
            const { $$css, ...otherClassName } = st;
            classNames.push(...Object.keys(otherClassName));
          }
        }
      );
      return {
        style: isWeb
          ? Array.from(cleanClassName(classNames).values()).reduce<
              Record<string, any>
            >(
              (acc2, cl) => {
                acc2[cl] = cl;
                return acc2;
              },
              { $$css: true }
            )
          : style,
      };
    },
  };
};

export const createStyles = <C extends string, S>(
  stylesParam: (_theme: Themes[keyof Themes]) => Record<C, S>
) => {
  let results = stylesParam(Registry.getTheme());

  const foo = new Proxy(
    Object.entries(results).reduce<
      Record<C, CrossedMethods<CrossedPropsExtended<S>>>
    >((acc, [keyStyle, styleOfKey]: [C, S]) => {
      acc[keyStyle] = createMethods(styleOfKey);
      return acc;
    }, {} as any) as Record<C, CrossedMethods<CrossedPropsExtended<S>>>,
    {
      get(cible, prop) {
        return createMethods((results as any)[prop]);
      },
    }
  );

  Registry.subscribe(() => {
    results = stylesParam(Registry.getTheme());
  });

  return foo;
};
