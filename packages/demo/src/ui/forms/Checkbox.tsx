import { Box, Checkbox } from '@mergeui/ui';
import type { Props } from '../../props';

export const CheckboxDemo = ({ size, variant, color }: Props) => {
  return (
    <Box>
      <Checkbox label={'hello'} size={size} variant={variant} color={color} />
    </Box>
  );
};