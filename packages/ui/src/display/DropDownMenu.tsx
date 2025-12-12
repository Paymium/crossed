/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withStaticProperties } from '@crossed/core';
import { composeStyles, CrossedMethods } from '@crossed/styled';
import { Popover } from '../overlay';
import { ComponentProps, memo, PropsWithChildren } from 'react';
import { MenuList } from './MenuList';
import { Divider as D, DividerProps } from '../layout/Divider';

type RootProps = ComponentProps<typeof Popover>;
const DropDownRoot = memo(
  ({
    children,
    placement = 'bottom-end',
    triggerStrategy = 'onPress',
    ...props
  }: RootProps) => {
    return (
      <Popover
        placement={placement}
        triggerStrategy={triggerStrategy}
        {...props}
      >
        {children}
      </Popover>
    );
  }
);

type TooltipTriggerProps = ComponentProps<typeof Popover.Trigger>;
const DropDowmMenuTrigger = ({ ...props }: TooltipTriggerProps) => {
  return <Popover.Trigger {...props} />;
};
type ContentProps = PropsWithChildren<{ style?: CrossedMethods<any> }>;

const DropDownMenuContent = ({ children, style }: ContentProps) => {
  return (
    <Popover.Content style={composeStyles(style)}>
      <MenuList>{children}</MenuList>
    </Popover.Content>
  );
};
type ItemProps = ComponentProps<typeof MenuList.Item>;
const DropDownMenuItem = ({ children, ...props }: ItemProps) => {
  return <MenuList.Item {...props}>{children}</MenuList.Item>;
};
type LabelProps = ComponentProps<typeof MenuList.Label>;
const DropDownMenuItemLabel = ({ children, ...props }: LabelProps) => {
  return <MenuList.Label {...props}>{children}</MenuList.Label>;
};
type TitleProps = ComponentProps<typeof MenuList.Title>;
const DropDownMenuItemTitle = ({ children, ...props }: TitleProps) => {
  return <MenuList.Title {...props}>{children}</MenuList.Title>;
};
const DropDownMenuDivider = (props: DividerProps) => <D {...props} />;

export const DropDownMenu = withStaticProperties(DropDownRoot, {
  Trigger: DropDowmMenuTrigger,
  Content: DropDownMenuContent,
  Item: DropDownMenuItem,
  Label: DropDownMenuItemLabel,
  Title: DropDownMenuItemTitle,
  Divider: DropDownMenuDivider,
});
