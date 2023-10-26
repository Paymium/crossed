import { Badge, YBox } from '@crossed/ui';
import type { Props } from '../../props';

const BadgeDemo = ({ color, size }: Props) => {
  return (
    <YBox space="md">
      <Badge color={color} size={size} text="BADGE" />
      <Badge color={color} size={size}>
        <Badge.Text>BADGE</Badge.Text>
      </Badge>
    </YBox>
  );
};

BadgeDemo.displayName = 'BadgeDemo';

export { BadgeDemo };
