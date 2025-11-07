import { cloneElement, ComponentProps, isValidElement } from 'react';
import { Box } from '../../layout';
import { composeStyles, inlineStyle } from '@crossed/styled';
import { alignSelfStyle, paddingStyles, shadowStyles } from '../../styles';
import { radiusStyles } from '../../styles/radius';

const styles = inlineStyle(({ colors }) => ({
  base: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border.primary.default,
    backgroundColor: colors.background.primary.alt,
  },
}));
export const Icon = ({ children, ...props }: ComponentProps<typeof Box>) => {
  return (
    <Box
      {...props}
      style={composeStyles(
        shadowStyles.xs,
        radiusStyles.md,
        paddingStyles.md,
        alignSelfStyle.center,
        styles,
        props.style
      )}
    >
      {isValidElement(children)
        ? cloneElement(children, {
            color: 'foreground.secondary.default',
            size: 20,
            ...(children as any).props,
          })
        : children}
    </Box>
  );
};
Icon.displayName = "FileUpload.Icon"
