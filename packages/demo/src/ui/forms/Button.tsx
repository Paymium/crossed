import { Button, Text, UilMessage, XBox, YBox } from '@crossed/ui';
import type { Props } from '../../props';

export const ButtonDemo = ({ size, color, variant }: Props) => {
  return (
    <XBox space="md">
      <YBox space="sm">
        <Text>Simple</Text>
        <Button
          text="Button"
          icon={<UilMessage />}
          color={color}
          size={size}
          variant={variant as any}
        />
        <Button
          text="Disabled"
          icon={<UilMessage />}
          color={color}
          size={size}
          variant={variant as any}
          disabled
        />
      </YBox>
      <YBox space="sm">
        <Text>Advanced</Text>
        <Button
          aria-label="advanced Button"
          color={color}
          size={size}
          variant={variant as any}
        >
          <Button.Element>
            <UilMessage />
          </Button.Element>
          <Button.Text>Button</Button.Text>
        </Button>
        <Button
          aria-label="disabled Button advanced"
          color={color}
          size={size}
          variant={variant as any}
          disabled
        >
          <Button.Element>
            <UilMessage />
          </Button.Element>
          <Button.Text>Disabled</Button.Text>
        </Button>
      </YBox>
    </XBox>
  );
};
