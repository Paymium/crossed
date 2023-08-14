import { Input, UilEye, YBox } from '@crossed/ui';
import type { Props } from '../../props';
import { useState } from 'react';

export const InputDemo = ({ size, variant, color }: Props) => {
  const [value, setValue] = useState('');
  return (
    <YBox space="md">
      <Input
        label="label"
        size={size}
        variant={variant as any}
        iconAfter={UilEye}
        icon={UilEye}
        color={color}
        onChangeValue={setValue}
        value={value}
      />
      <Input
        color={color}
        size={size}
        variant={variant as any}
        onChangeValue={setValue}
        value={value}
      >
        <Input.Label>Label</Input.Label>
        <Input.Content>
          <Input.Icon>
            <UilEye />
          </Input.Icon>
          <Input.Input />
          <Input.Icon>
            <UilEye />
          </Input.Icon>
        </Input.Content>
      </Input>
    </YBox>
  );
};
