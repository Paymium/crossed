/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

// import { useMemo } from 'react';
import { Registry } from '../Registry';
import { CreateStylesParams, CrossedPropsExtended } from '../types';

export const useStyles = <C extends string, S>(
  params: CreateStylesParams<C, S>,
  props: CrossedPropsExtended<S>
) => {
  // TODO: Error in nextjs app router TypeError: Cannot read properties of null (reading 'useMemo')
  // return useMemo(() => {
  const classNames: Record<C, string[]> = {} as any;
  if (params && typeof params === 'function') {
    (Object.entries(params(Registry.getTheme())) as [C, StyleSheet][]).forEach(
      ([keyStyle, styleOfKey]: [C, StyleSheet]) => {
        Registry.apply(() => styleOfKey, {
          props,
          isWeb: true,
          addClassname: ({ body }) => {
            if (!classNames[keyStyle]) {
              classNames[keyStyle] = [];
            }
            classNames[keyStyle].push(...Object.keys(body));
          },
        });
      }
    );
  }

  const styles = (
    Object.entries(classNames) as unknown as [C, string[]][]
  ).reduce<Record<string, { className: string; style: Record<string, any> }>>(
    (acc, [key, className]) => {
      acc[key] = {
        className: className.join(' '),
        style: className.reduce<Record<string, any>>(
          (acc, cl) => {
            acc[cl] = cl;
            return acc;
          },
          { $$css: true }
        ),
      };
      return acc;
    },
    {}
  );

  return styles;
  // }, [params, props]);
};
