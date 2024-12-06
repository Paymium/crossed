/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { CrossedPropsExtended } from '../types';
import { cleanClassName } from './cleanClassName';
import { rnw } from './rnw';
import { cache } from './cache';
import { apply } from './apply';

export const createMethods = (
  styleOfKey: Record<string, any> | (() => unknown),
  stylesParent: Record<string, any> = {}
) => {
  return {
    original: styleOfKey,
    stylesParent,
    style: (props: CrossedPropsExtended = {}) => {
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
      }, stylesParent);
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
    className: (props: CrossedPropsExtended = {}) => {
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
        style: stylesParent,
      };
      cache.set({ style: styleOfKey, props }, result);
      return result;
    },
    rnw: rnw({ styleOfKey, stylesParent }),
  };
};
