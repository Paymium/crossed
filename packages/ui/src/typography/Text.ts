import { Text as TextNative } from 'react-native';
import { styled } from '@crossed/styled';

export const Text = styled(TextNative, {
  className: ['text-white'],
  variants: {
    variant: { link: { className: ['text-blue-500'] } },
    weight: {
      thin: { className: ['font-thin'] },
      extralight: { className: ['font-extralight'] },
      light: { className: ['font-light'] },
      normal: { className: ['font-normal'] },
      medium: { className: ['font-medium'] },
      semibold: { className: ['font-semibold'] },
      bold: { className: ['font-bold'] },
      extrabold: { className: ['font-extrabold'] },
      black: { className: ['font-black'] },
    },
    size: {
      xs: { className: ['text-xs'] },
      sm: { className: ['text-sm'] },
      md: { className: ['text-md'] },
      lg: { className: ['text-lg'] },
      xl: { className: ['text-xl'] },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
