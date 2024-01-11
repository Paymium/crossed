'use client';

import { extract } from './extract';
import { forwardRef, memo, useMemo } from 'react';
import { createStyleSheet } from 'react-native-unistyles';
import { withStaticProperties } from '@crossed/core/src/withStaticProperties';
import type {
  ComponentLocal,
  ExtraStyle,
  ExtractVariant,
  UnistylesTheme,
  UnistylesValues,
  UnistylesValuesExtends,
} from './types';
import { useLogic } from './useLogic';

export const styled = <
  P extends Record<string, any>,
  S extends
    | Partial<UnistylesValuesExtends>
    | ((theme: UnistylesTheme) => Partial<UnistylesValuesExtends>)
>(
  Comp: ComponentLocal<P>,
  style: S
) => {
  const styleSheet = createStyleSheet((e) => {
    const styleParam =
      typeof style === 'function' ? style(e) : (style as UnistylesValues);
    const resultExtract = extract(styleParam);
    return resultExtract;
  }) as unknown as S;
  return withStaticProperties(
    memo(
      forwardRef(
        (
          params: ExtractVariant<S> &
            P & {
              pressed?: boolean;
              hovered?: boolean;
              debug?: boolean;
            },
          ref: any
        ) => {
          const {
            pressed: pressedProps,
            hovered: hoveredProps,
            debug,
            ...props
          } = params as any;
          const { actions, styles } = useLogic({
            props,
            debug,
            styleSheet: styleSheet as any,
            active: pressedProps,
            hovered: hoveredProps,
          });
          return useMemo(
            () => (
              <Comp ref={ref} {...(props as any)} {...actions} style={styles} />
            ),
            [actions, props, styles]
          );
        }
      )
    ),
    { styleSheet }
  );
};
