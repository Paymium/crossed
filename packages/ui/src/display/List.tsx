/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import {
  composeStyles,
  createStyles,
  CrossedMethods,
  inlineStyle,
  withReactive,
} from '@crossed/styled';
import { Text, TextProps } from '../typography/Text';
import { YBox, type YBoxProps } from '../layout/YBox';
import { Divider as D, DividerProps } from '../layout/Divider';
import { withStaticProperties } from '@crossed/core';
import { ComponentProps, forwardRef, memo, RefAttributes } from 'react';
import { View } from 'react-native';
import { Box, BoxViewProps } from '../layout';

const rootStyle = createStyles(({ colors, space }) => ({
  default: {
    base: {
      backgroundColor: colors.background.secondary,
      borderRadius: 12,
    },
  },
  border: {
    base: {
      borderWidth: 1,
      borderColor: colors.border.primary,
    },
  },
  padded: { base: { padding: space.md } },
}));
const itemStyles = createStyles((t) => ({
  padding: {
    base: {
      paddingTop: t.space.md,
      paddingBottom: t.space.md,
      paddingLeft: t.space.xl,
      paddingRight: t.space.xl,
    },
  },
  item: {
    base: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      borderWidth: 0,
    },
  },
}));

const Root = memo<ListProps & RefAttributes<View>>(
  forwardRef<View, ListProps>(
    ({ padded = true, bordered = true, ...props }: ListProps, ref: any) => {
      return (
        <YBox
          role="list"
          alignItems={'stretch'}
          space={padded ? 'xs' : undefined}
          {...props}
          style={composeStyles(
            rootStyle.default,
            bordered && rootStyle.border,
            padded && rootStyle.padded,
            props.style
          )}
          ref={ref}
        />
      );
    }
  )
);
Root.displayName = 'List';

export type ListProps = YBoxProps & {
  /**
   * Apply padding
   */
  padded?: boolean;
  /**
   * Apply border
   */
  bordered?: boolean;
};

const ListDivider = (props: DividerProps) => <D {...props} />;
ListDivider.displayName = 'List.Divider';

export type ListItemProps = Omit<BoxViewProps, 'style'> & {
  style?: CrossedMethods<any>;
};

const ListItem = withReactive<ListItemProps>(
  forwardRef<View, ListItemProps>(
    ({ style, children, ...props }: ListItemProps, ref) => {
      return (
        <Box
          {...props}
          ref={ref}
          style={composeStyles(itemStyles.padding, itemStyles.item, style)}
        >
          {children}
        </Box>
      );
    }
  )
);
ListItem.displayName = 'List.Item';

const ListLabel = ({ style, ...props }: ComponentProps<typeof Text>) => (
  <Text
    {...props}
    style={composeStyles(
      itemStyles.padding,
      inlineStyle(() => ({ base: { marginTop: 0 } })),
      style
    )}
  />
);
ListLabel.displayName = 'List.Label';
const ListTitle = (props: TextProps) => <Text color="secondary" {...props} />;
ListTitle.displayName = 'List.Title';

const List = withStaticProperties(Root, {
  Divider: ListDivider,
  Item: ListItem,
  Label: ListLabel,
  Title: ListTitle,
});
List.displayName = 'List';

export { List, ListDivider, ListItem, ListLabel, ListTitle };
