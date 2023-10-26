import { withStaticProperties } from '@crossed/core';
import type { ComponentType } from 'react';
import type { TextProps as NTextProps } from 'react-native';
import { createBadgeMain } from './Badge';
import { createBadgeText } from './BadgeText';

export const createBadge = <
  BadgeProps extends Record<string, any>,
  TextProps extends NTextProps
>(components: {
  Root: ComponentType<BadgeProps>;
  Text: ComponentType<TextProps>;
}) => {
  const { Root, Text } = components;
  const Badge = createBadgeMain(Root);
  const BadgeText = createBadgeText(Text);

  Badge.displayName = 'Badge';
  BadgeText.displayName = 'BadgeText';

  return withStaticProperties(Badge, {
    Text: BadgeText,
  });
};
