/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeEventHandlers, withStaticProperties } from '@crossed/core';
import { CrossedMethods } from '@crossed/styled';
import { Popover, useFloatingContext } from '../overlay';
import { ComponentProps, memo, PropsWithChildren } from 'react';
import { MenuList } from './MenuList';
import { Divider as D, DividerProps } from '../layout/Divider';
import { useMedia } from '../useMedia';

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
  const { md } = useMedia();
  return (
    <Popover.Content>
      <MenuList style={style} bordered={md}>
        {children}
      </MenuList>
    </Popover.Content>
  );
};
type ItemProps = ComponentProps<typeof MenuList.Item> & {
  onPress?: () => void;
};
const DropDownMenuItem = ({ children, onPress, ...props }: ItemProps) => {
  const { onClose } = useFloatingContext();
  return (
    <MenuList.Item
      {...(props as any)}
      onPress={composeEventHandlers(onPress, onClose)}
    >
      {children}
    </MenuList.Item>
  );
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
