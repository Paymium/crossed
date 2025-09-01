/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Pressable, PressableProps, View, type ViewProps } from 'react-native';
import {
  composeStyles,
  createStyles,
  type CrossedMethods,
} from '@crossed/styled';
import { forwardRef, PropsWithChildren, useCallback, useMemo } from 'react';
import { baseStyle } from '../styles/base';
import { gapStyles } from '../styles/gap';
import { justifyContentStyle } from '../styles/justifyContent';
import { alignItemsStyle, alignSelfStyle } from '../styles/alignItems';

const styleBox = createStyles(
  () =>
    ({
      root: {
        base: { display: 'flex' },
        web: { base: { boxSizing: 'border-box' } },
      },
      center: {
        base: { alignItems: 'center', justifyContent: 'center' },
      },
    }) as const
);

type Base = {
  /**
   * extends style
   */
  style?: CrossedMethods<any>;
  /**
   * Gap between children
   * if null, disable gap
   */
  space?: null | keyof typeof gapStyles;
  /**
   * Center content
   * @default false
   */
  center?: boolean;

  /**
   * Set justify-content style
   */
  justifyContent?: keyof typeof justifyContentStyle;

  /**
   * Set align-items style
   */
  alignItems?: keyof typeof alignItemsStyle;

  /**
   * Set align-self style
   */
  alignSelf?: keyof typeof alignSelfStyle;
};

export type BoxPressableProps = PropsWithChildren<{
  pressable: true;
}> &
  Base &
  Omit<PressableProps, 'style' | 'children'> &
  React.RefAttributes<View>;

export type BoxViewProps = {
  pressable?: never | false;
} & Base &
  Omit<ViewProps, 'style'> &
  React.RefAttributes<View>;

/**
 * Represents the properties for a Box component.
 */
export type BoxProps = BoxViewProps | BoxPressableProps;

type BoxComponent = React.ForwardRefExoticComponent<
  BoxViewProps | BoxPressableProps
>;

export const Box: BoxComponent = forwardRef(
  (
    {
      style,
      space,
      center,
      justifyContent,
      alignItems,
      alignSelf,
      pressable,
      ...props
    },
    ref
  ) => {
    const styles = useMemo(() => {
      return composeStyles(
        baseStyle.view,
        styleBox.root,
        justifyContentStyle[justifyContent],
        alignItemsStyle[alignItems],
        alignSelfStyle[alignSelf],
        center === true && styleBox.center,
        gapStyles[space],
        style
      );
    }, [center, style, alignSelf, alignItems, justifyContent, space]);
    const handleStyles = useCallback(
      ({ pressed, hovered, focused }) => {
        return styles.rnw({
          active: pressed,
          hover: hovered,
          focus: focused,
        }).style;
      },
      [styles]
    );
    const Comp = useMemo(() => {
      return pressable ? Pressable : View;
    }, [pressable]);
    return (
      <Comp
        ref={ref}
        {...(props as any)}
        role={pressable ? 'button' : null}
        style={pressable ? handleStyles : styles.rnw().style}
      />
    );
  }
);
