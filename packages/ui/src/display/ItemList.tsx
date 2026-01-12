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
  inlineStyle,
  withReactive,
} from '@crossed/styled';
import { Text, TextProps } from '../typography/Text';
import { YBox, type YBoxProps } from '../layout/YBox';
import { Divider as D, DividerProps } from '../layout/Divider';
import { withStaticProperties } from '@crossed/core';
import { ComponentProps, forwardRef, memo, RefAttributes } from 'react';
import { View } from 'react-native';
import { Box, BoxProps } from '../layout';
import {
  flexDirectionStyles,
  justifyContentStyle,
  paddingHorizontalStyles,
  paddingStyles,
  paddingVerticalStyles,
} from '../styles';

const rootStyle = createStyles(({ colors }) => ({
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
}));

const itemPaddingStyle = composeStyles(
  paddingHorizontalStyles.xl,
  paddingVerticalStyles.md
);

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
            padded && paddingStyles.md,
            props.style
          )}
          ref={ref}
        />
      );
    }
  )
);
Root.displayName = 'ItemList.Root';

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

const ItemListDivider = (props: DividerProps) => <D {...props} />;
ItemListDivider.displayName = 'ItemList.Divider';

const ItemListItem = withReactive<BoxProps>(
  ({ style, children, ...props }: BoxProps) => {
    return (
      <Box
        {...props}
        style={composeStyles(
          flexDirectionStyles.column,
          justifyContentStyle.center,
          itemPaddingStyle,
          style
        )}
      >
        {children}
      </Box>
    );
  }
);
ItemListItem.displayName = 'ItemList.Item';

const ItemListLabel = ({ style, ...props }: ComponentProps<typeof Text>) => (
  <Text
    {...props}
    style={composeStyles(
      itemPaddingStyle,
      inlineStyle(() => ({ base: { marginTop: 0 } })),
      style
    )}
  />
);
ItemListLabel.displayName = 'ItemList.Label';
const ItemListTitle = (props: TextProps) => (
  <Text color="secondary" {...props} />
);
ItemListTitle.displayName = 'ItemList.Title';

const ItemList = withStaticProperties(Root, {
  Divider: ItemListDivider,
  Item: ItemListItem,
  Label: ItemListLabel,
  Title: ItemListTitle,
});
ItemList.displayName = 'ItemList';

export {
  ItemList,
  ItemListDivider,
  ItemListItem,
  ItemListLabel,
  ItemListTitle,
};
