/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withStaticProperties } from '@crossed/core';
import { Text, TextProps } from '../typography';
import { composeStyles, CrossedMethods, inlineStyle } from '@crossed/styled';
import { Popover } from '../overlay';
import { ComponentProps, memo, PropsWithChildren } from 'react';

const tooltipStyles = inlineStyle(({ colors, space }) => ({
  base: {
    backgroundColor: colors.text.primary,
    borderRadius: 16,
    paddingVertical: space.xs,
    paddingHorizontal: space.sm,
    maxWidth: 276,
  },
  web: { base: { width: 'max-content' as any } },
}));
type RootProps = ComponentProps<typeof Popover>;

const TooltipRoot = memo(
  ({
    children,
    placement = 'bottom',
    triggerStrategy = 'onPointerEnter',
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
const TooltipTrigger = ({ ...props }: TooltipTriggerProps) => {
  return <Popover.Trigger {...props} />;
};
type ContentProps = PropsWithChildren<{ style?: CrossedMethods<any> }>;
const TooltipContent = ({ children, style }: ContentProps) => {
  return (
    <Popover.Content style={composeStyles(tooltipStyles, style)}>
      {children}
    </Popover.Content>
  );
};

const TooltipText = (props: TextProps) => {
  return (
    <Text
      {...props}
      style={composeStyles(
        inlineStyle(({ colors }) => ({
          media: { md: { color: colors.text.invert } },
        })),
        props.style
      )}
    />
  );
};
TooltipText.displayName = 'Tooltip.Text';

export const Tooltip = withStaticProperties(TooltipRoot, {
  Trigger: TooltipTrigger,
  Content: TooltipContent,
  Text: TooltipText,
});
