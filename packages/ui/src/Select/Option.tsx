import { styled } from '@mergeui/core';
import { Pressable } from 'react-native';

export const [SelectOption] = styled(Pressable, {
  className: ['appearance-none'],
  props: { as: 'option' },
});
