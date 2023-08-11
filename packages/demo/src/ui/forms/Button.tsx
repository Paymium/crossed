import {
  Button,
  Text,
  UilMessage,
  XBox,
  YBox,
  useThemeContext,
} from '@mergeui/ui';
import type { Props } from '../../props';

export const ButtonDemo = ({ size, color, variant }: Props) => {
  const { theme, setTheme } = useThemeContext();

  return (
    <XBox space="md">
      <YBox space="sm">
        <Text>Simple</Text>
        <Button
          text="Button"
          icon={UilMessage}
          color={color}
          size={size}
          variant={variant as any}
          onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        />
        <Button
          text="Disabled"
          icon={UilMessage}
          color={color}
          size={size}
          variant={variant as any}
          disabled
        />
      </YBox>
      <YBox space="sm">
        <Text>Advanced</Text>
        <Button color={color} size={size} variant={variant as any}>
          <Button.Icon>
            <UilMessage />
          </Button.Icon>
          <Button.Text>Button</Button.Text>
        </Button>
        <Button color={color} size={size} variant={variant as any} disabled>
          <Button.Icon>
            <UilMessage />
          </Button.Icon>
          <Button.Text>Disabled</Button.Text>
        </Button>
      </YBox>
    </XBox>
  );
};
