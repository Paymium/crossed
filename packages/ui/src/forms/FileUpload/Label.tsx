import { Text } from '../../typography';
import { withDefaultProps } from '@crossed/core';

export const Label = withDefaultProps(Text, {
  color: 'tertiary',
  fontSize: 'sm',
});
Label.displayName = 'FileUpload.Label';
