import { Box, Checkbox } from '@crossed/ui';
import type { Props } from '../../props';

export const CheckboxDemo = ({ size, variant, color }: Props) => {
  return (
    <Box>
      <Checkbox
        label={'hello'}
        size={size}
        variant={variant as any}
        color={color}
      />
    </Box>
  );
};
