import { Button } from '@mergeui/ui';

export const ButtonDemo = ({ size, color }) => {
  return (
    <Button color={color} size={size}>
      <Button.Text>Button</Button.Text>
    </Button>
  );
};
