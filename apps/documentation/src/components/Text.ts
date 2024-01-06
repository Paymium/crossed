'use client';

import { styled } from '@crossed/styled';
import { Text as TextNative } from 'react-native';

export const Text = styled(TextNative, (t) => {
  return {
    'color': t.colors.typography,
    'fontFamily': 'arial',
    'display': 'flex',
    'fontSize': 14,
    'hover:': {
      color: 'red',
    },
    'active:': {
      color: 'orange',
    },
  };
});
