import { ReturnExtract, extract } from './extract';
import { forwardRef, memo } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { withStaticProperties } from '@crossed/core/src/withStaticProperties';
import type {
  ComponentLocal,
  ExtractStyle,
  ExtractVariant,
  UnistylesTheme,
  UnistylesValuesExtends,
} from './types';
import { useLogic } from './useLogic';
import { useSignals } from '@preact/signals-react/runtime';
import { Slot } from './Slot';
import { parseStyle } from './parseStyle';
import { Platform } from 'react-native';

export type StyledOptions = { debug?: boolean; name?: string };

export const styled = <
  P extends Record<string, any>,
  S extends
    | Partial<UnistylesValuesExtends>
    | ((_theme: UnistylesTheme) => Partial<UnistylesValuesExtends>)
>(
  Comp: ComponentLocal<P>,
  style: S,
  { debug: debugStyled, name }: StyledOptions = {}
) => {
  // eslint-disable-next-line no-console
  const log = (...args: any[]) => console.log(`styled - "${name}" -`, ...args);

  debugStyled && log(`create styled component `);

  const styleSheet = (debug?: boolean) =>
    createStyleSheet((e) => {
      const styleParam = (
        typeof style === 'function' ? style(e) : style
      ) as ExtractStyle<typeof style>;
      const resultExtract = extract(styleParam);
      debug && log('after extrac ', resultExtract);
      return resultExtract;
    }) as unknown as S;
  return withStaticProperties(
    memo(
      forwardRef(
        (
          params: P &
            ExtractVariant<S> & {
              hovered?: boolean;
              active?: boolean;
              focus?: boolean;
              debug?: boolean;
              asChild?: any;
            },
          ref: any
        ) => {
          const { debug, asChild, ...props } = params;

          const isDebug = debugStyled || debug;

          useSignals();

          const { styles } = useStyles(
            styleSheet(isDebug) as any,
            props as any
          );

          const { styles: old } = useStyles(
            ((Comp as any).styleSheet || {}) as any,
            props as any
          );
          const l = useLogic({
            name,
            props,
            debug: isDebug,
            styles: styles as any,
          });
          const t = useLogic({
            name: (Comp as any).displayName,
            props,
            debug: isDebug,
            styles: old as any,
          });

          isDebug && log(`render`);
          const propsTmp = {
            ...(props as any),
            ref: ref,
            ...l.actions,
            style:
              Platform.OS === 'web'
                ? parseStyle({
                    ...t.styles.value,
                    ...l.styles.value,
                  })
                : {
                    ...t.styles.value,
                    ...l.styles.value,
                  },
          };
          return asChild ? <Slot {...propsTmp} /> : <Comp {...propsTmp} />;
        }
      )
    ),
    {
      styleSheet: (e: UnistylesTheme) => {
        let st = styleSheet(debugStyled);
        const styleSheetExtends =
          'styleSheet' in Comp ? Comp.styleSheet(e) : undefined;
        let stTmp: ReturnExtract;
        if (typeof st === 'function') {
          stTmp = st(e) as ReturnExtract;
        } else {
          stTmp = st as ReturnExtract;
        }
        return {
          ...styleSheetExtends,
          ...stTmp,
          base: { ...(styleSheetExtends || {}).base, ...stTmp.base },
          active: { ...(styleSheetExtends || {}).base, ...stTmp.active },
          focus: { ...(styleSheetExtends || {}).focus, ...stTmp.focus },
          hover: { ...(styleSheetExtends || {}).hover, ...stTmp.hover },
        };
      },
      name,
      displayName: name,
    }
  );
};
