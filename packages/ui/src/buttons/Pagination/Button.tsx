import { Pressable } from 'react-native';
import { Text } from '../../typography';
import { composeStyles } from '@crossed/styled';
import { ComponentProps, PropsWithChildren } from 'react';
import {
  alignItemsStyle,
  justifyContentStyle,
  paddingHorizontalStyles,
  paddingVerticalStyles,
} from '../../styles';
import { pagePressableStyles } from './styles';
import { useVariantProvider } from './context';
import { radiusStyles } from '../../styles/radius';

export const PaginationButton = ({
  children,
  onPress,
  disabled,
  isCurrent,
}: PropsWithChildren<
  Pick<ComponentProps<typeof Pressable>, 'onPress' | 'disabled'> & {
    isCurrent?: boolean;
  }
>) => {
  const { variant } = useVariantProvider();
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ hovered, pressed }: any) =>
        composeStyles(
          paddingHorizontalStyles.md,
          paddingVerticalStyles.md,
          alignItemsStyle.center,
          justifyContentStyle.center,
          variant === 'square' && radiusStyles.md,
          variant === 'circle' && radiusStyles.full,
          pagePressableStyles
        ).style({
          hover: hovered,
          active: pressed,
        }).style
      }
    >
      {({ hovered }: any) => (
        <Text
          fontSize={'sm'}
          fontWeight={'medium'}
          color={hovered || isCurrent ? 'secondary' : 'quaternary'}
        >
          {children}
        </Text>
      )}
    </Pressable>
  );
};
PaginationButton.displayName = 'PaginationButton';
