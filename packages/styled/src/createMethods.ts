/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Registry } from './Registry';
import { isWeb } from './isWeb';
import { CrossedPropsExtended, PluginContext } from './types';

const cache = new Map();

const apply = <S>(
  style: Record<string, any>,
  props: CrossedPropsExtended<S>,
  addClassname: PluginContext<S>['addClassname']
) => {
  Registry.apply(() => style, {
    isWeb,
    props,
    addClassname,
    cache,
  });
};

const cleanClassName = (classNames: string[]) => {
  return classNames.reduce((acc, className) => {
    const [property] = className.match(/^([a-z\-:]+)\[/g) || [];

    if (property) {
      acc.forEach((accKey) => {
        const [same] =
          accKey.match(new RegExp(`^${property.replace('[', '\\[')}`, 'g')) ||
          [];
        if (same) {
          acc.delete(accKey);
        }
      });
    }
    acc.add(className);
    return acc;
  }, new Set<string>());
};

export const createMethods = <S>(styleOfKey: Record<string, any>) => {
  return {
    original: styleOfKey,
    style: (props: CrossedPropsExtended<S> = {}) => {
      const old = cache.get({ style: styleOfKey, props });
      if (old) {
        return old;
      }
      let style = {} as any;
      const parentStyle = (
        Array.isArray(props.style) ? props.style : [props.style]
      ).reduce((acc, st: any) => {
        if (!st || st.$$css) return acc;
        if (!st.$$css) {
          acc = { ...acc, ...st };
        }
        return acc;
      }, {});
      apply(styleOfKey, props, ({ body, suffix, wrapper, prefix }) => {
        if (body && !suffix && !wrapper && !prefix) {
          style = {
            ...style,
            ...Object.values(body).reduce((acc, e) => ({ ...acc, ...e }), {}),
          };
        }
      });
      const result = {
        style: {
          ...style,
          ...parentStyle,
        },
      };
      cache.set({ style: styleOfKey, props }, result);
      return result;
    },
    className: (props: CrossedPropsExtended<S> = {}) => {
      const old = cache.get({ style: styleOfKey, props });
      if (old) {
        return old;
      }
      const classNames: string[] = props.className
        ? props.className.split(' ')
        : [];
      const parentStyle = (
        Array.isArray(props.style) ? props.style : [props.style]
      ).reduce((acc, st: any) => {
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
      const result = {
        className: Array.from(cleanClassName(classNames).values()).join(' '),
      };
      cache.set({ style: styleOfKey, props }, result);
      return result;
    },
    rnw: (props: CrossedPropsExtended<S> = {}) => {
      const old = cache.get({ style: styleOfKey, props });
      if (old) {
        return old;
      }

      let style = {} as any;
      const classNames: string[] = props.className
        ? props.className.split(' ')
        : [];

      apply(styleOfKey, props, ({ body }) => {
        style = {
          ...style,
          ...Object.values(body).reduce((acc, e) => ({ ...acc, ...e }), {}),
        };
        classNames.push(...Object.keys(body));
      });

      let styletmp: object | undefined;
      (Array.isArray(props.style) ? props.style : [props.style])
        .flat(Infinity)
        .forEach((st) => {
          if (!st) return;
          if ((st as any).$$css) {
            const { $$css, ...otherClassName } = st as any;
            classNames.push(...Object.keys(otherClassName));
          } else if (!(st as any).$$css) {
            style = { ...style, ...st };
            styletmp = { ...styletmp, ...st };
          }
        });
      const styletransformWeb = isWeb
        ? Array.from(cleanClassName(classNames).values()).reduce<
            Record<string, any>
          >(
            (acc2, cl) => {
              acc2[cl] = cl;
              return acc2;
            },
            { $$css: true }
          )
        : style;

      const result = {
        style: styletmp ? [styletransformWeb, styletmp] : styletransformWeb,
      };
      cache.set({ style: styleOfKey, props }, result);
      return result;
    },
  };
};
