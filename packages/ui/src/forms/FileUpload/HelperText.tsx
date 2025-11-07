import { withDefaultProps } from '@crossed/core';
import { Text } from '../../typography';

export const HelperText = withDefaultProps(Text, {
  color: 'tertiary',
  fontSize: 'sm',
});
