import { extract } from './extract';
import { forwardRef, memo } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { withStaticProperties } from '@crossed/core/src/withStaticProperties';
import type {
  Children,
  ComponentLocal,
  ExtractVariant,
  UnistylesTheme,
  UnistylesValuesExtends,
} from './types';
import { useLogic } from './useLogic';
import { useSignals } from '@preact/signals-react/runtime';

export const styled = <
  P extends Record<string, any>,
  S extends
    | Partial<UnistylesValuesExtends>
    | ((_theme: UnistylesTheme) => Partial<UnistylesValuesExtends>)
>(
  Comp: ComponentLocal<P>,
  style: S,
  { debug: debugStyled, name }: { debug?: boolean; name?: string } = {}
) => {
  // eslint-disable-next-line no-console
  const log = (...args: any[]) => console.log(`styled - "${name}" -`, ...args);

  debugStyled && log(`create styled component `);

  const styleSheet = (debug?: boolean) =>
    createStyleSheet((e) => {
      const styleParam =
        typeof style === 'function' ? style(e) : (style as any);
      const resultExtract = extract(styleParam);
      debug && log('after extrac ', resultExtract);
      return resultExtract;
    }) as unknown as S;
  return withStaticProperties(
    memo(
      forwardRef(
        (
          params: Children<P> &
            ExtractVariant<S> & {
              pressed?: boolean;
              hovered?: boolean;
              focus?: boolean;
              debug?: boolean;
              asChild?: any;
            },
          ref: any
        ) => {
          const {
            pressed: pressedProps,
            hovered: hoveredProps,
            focus: focusProps,
            debug,
            asChild,
            ...props
          } = params as any;

          const isDebug = debugStyled || debug;

          useSignals();

          const { styles } = useStyles(styleSheet(debug) as any, props as any);

          const { styles: old } = useStyles(
            ((Comp as any).styleSheet || {}) as any,
            props as any
          );
          isDebug && log('Comp.styleSheet', Comp, old);

          const l = useLogic({
            name,
            props,
            debug: isDebug,
            styles: styles as any,
            active: pressedProps,
            hovered: hoveredProps,
            focus: focusProps,
          });
          const t = useLogic({
            name: (Comp as any).displayName,
            props,
            debug: isDebug,
            styles: old as any,
            active: pressedProps,
            hovered: hoveredProps,
            focus: focusProps,
          });

          isDebug && log(`render`);
          const propsTmp = {
            ...(props as any),
            ref: ref,
            ...l.actions,
            style: {
              ...t.styles.value,
              ...l.styles.value,
            },
          };
          return typeof props.children === 'function' ? (
            props.children({
              ...propsTmp,
              children: propsTmp.children.props?.children || propsTmp.children,
            })
          ) : (
            <Comp {...propsTmp} />
          );
        }
      )
    ),
    {
      styleSheet: (e: UnistylesTheme) => {
        const st = styleSheet(debugStyled);
        return {
          ...(Comp as any).styleSheet?.(e),
          ...(typeof st === 'function' ? st(e) : st),
        };
      },
      name,
      displayName: name,
    }
  );
};
