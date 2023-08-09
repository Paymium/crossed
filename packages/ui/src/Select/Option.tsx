import { styled } from '@mergeui/core';
import { Pressable } from 'react-native';

export const [SelectOption] = styled(Pressable, {
  base: {
    styles: ['appearance-none'],
    props: { as: 'option' },
  },
});
