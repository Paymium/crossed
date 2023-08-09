import { Button, UilMessage, YBox } from '@mergeui/ui';
import type { Props } from '../props';

export const ButtonDemo = ({ size, color, variant }: Props) => {
  return (
    <YBox space="md">
      <Button
        text="Button"
        icon={UilMessage}
        color={color}
        size={size}
        variant={variant as any}
      />
      <Button color={color} size={size} variant={variant as any}>
        <Button.Icon>
          <UilMessage />
        </Button.Icon>
        <Button.Text>Button</Button.Text>
      </Button>
    </YBox>
  );
};
