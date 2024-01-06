'use client';

import { extract } from './extract';
import { forwardRef, memo } from 'react';
import { createStyleSheet } from 'react-native-unistyles';
import { withStaticProperties } from '@crossed/core/src/withStaticProperties';
import Animated from 'react-native-reanimated';
import type { ComponentLocal, UnistylesTheme, UnistylesValues, UnistylesValuesExtends } from './types';
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
  const CompStyled = Animated.createAnimatedComponent(Comp as any);
  let animationDurationTmp: UnistylesValuesExtends['animationDuration'] = 100;
  let animationKeysTmp: UnistylesValuesExtends['animationKeys'] = [];

  const styleSheet = createStyleSheet((e) => {
    const { animationDuration, animationKeys, ...styleTmp } =
      typeof style === 'function' ? style(e) : style;
    animationKeysTmp = animationKeys;
    animationDurationTmp = animationDuration;
    return extract({
      // ...(name && name in e.components ? e.components[name] : {}),
      ...(styleTmp as UnistylesValues),
    });
  });
  return withStaticProperties(
    memo(
      forwardRef(
        (
          {
            pressed: pressedProps,
            hovered: hoveredProps,
            ...props
          }: P & {
            pressed?: boolean;
            hovered?: boolean;
          },
          ref: any
        ) => {
          const { actions, styles } = useLogic({
            props,
            styleSheet,
            pressed: pressedProps,
            hovered: hoveredProps,
            animationDuration: animationDurationTmp,
            animationKeys: animationKeysTmp,
          });
          return (
            <CompStyled
              ref={ref}
              {...(props as any)}
              {...actions}
              style={styles.base}
            />
          );
        }
      )
    ),
    { styleSheet }
  );
};

// const toto = () => <div onMouse={} />

// const Button = styled(Pressable, ({ space }) => ({
//   name: 'Button',
//   justifyContent: 'center',
//   alignItems: 'center',
//   alignSelf: 'flex-start',
//   flexDirection: 'row',
//   flex: 0,
//   opacity: 1,
//   animationDuration: 150,
//   animationKeys: ['backgroundColor'],
//   variants: {
//     color: {
//       default: {
//         'backgroundColor': 'gray',
//         ':active': {
//           backgroundColor: 'red',
//           opacity: 0.5,
//         },
//       },
//       red: {
//         'backgroundColor': 'red',
//         ':active': {
//           backgroundColor: 'green',
//         },
//       },
//     },
//     rounded: {
//       default: {
//         borderRadius: 9,
//       },
//       xs: {
//         borderRadius: 5,
//       },
//       sm: {
//         borderRadius: 7,
//       },
//       md: {
//         borderRadius: 9,
//       },
//       lg: {
//         borderRadius: 10,
//       },
//       xl: {
//         borderRadius: 16,
//       },
//     },
//     size: {
//       default: {
//         paddingVertical: space.md,
//         paddingHorizontal: space.lg,
//       },
//       xs: {
//         paddingVertical: space.xs,
//         paddingHorizontal: space.sm,
//       },
//       sm: {
//         paddingVertical: space.sm,
//         paddingHorizontal: space.md,
//       },
//       md: {
//         paddingVertical: space.md,
//         paddingHorizontal: space.lg,
//       },
//       lg: {
//         paddingVertical: space.lg,
//         paddingHorizontal: space.xl,
//       },
//     },
//   },
// }));
