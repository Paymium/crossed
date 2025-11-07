import { composeEventHandlers } from '@crossed/core';
import {
  composeStyles,
  createStyles,
  CrossedMethods,
  isWeb,
} from '@crossed/styled';
import {
  alignItemsStyle,
  paddingHorizontalStyles,
  paddingVerticalStyles,
} from '../../styles';
import { radiusStyles } from '../../styles/radius';
import { ComponentProps } from 'react';
import { Pressable } from 'react-native';
import { useFileUploadProvider } from './context';


const styles = createStyles(({ colors }) => ({
  default: {
    'base': {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: colors.border.secondary.w,
      backgroundColor: colors.background.primary.alt,
    },
    ':hover': {
      borderColor: colors.border.brand.default,
    },
  },
  disabled: {
    base: {
      borderColor: colors.border.disabled.w,
      backgroundColor: colors.background.disabled.subtle,
    },
    web: { base: { cursor: 'not-allowed' } },
  },
}));

export const Trigger = (
  props: Omit<ComponentProps<typeof Pressable>, 'style'> & {
    style?: CrossedMethods<any>;
    multiple?: boolean;
  }
) => {
  const {inputRef, isDragging} = useFileUploadProvider()
  return (
    <Pressable
      {...props}
      onPress={composeEventHandlers(() => {
        isWeb && inputRef.current?.click();
      }, props.onPress)}
      style={({ hovered, pressed }: any) =>
        composeStyles(
          alignItemsStyle.center,
          radiusStyles.xl,
          paddingHorizontalStyles['3xl'],
          paddingVerticalStyles.xl,
          styles.default,
          (props as any).disabled && styles.disabled,
          props.style
        ).rnw({
          hover: isDragging || (!props.disabled && hovered),
          active: !props.disabled && pressed,
        }).style
      }
    />
  );
};
