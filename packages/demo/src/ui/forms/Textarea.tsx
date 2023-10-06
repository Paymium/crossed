import { Textarea, UilEye, YBox } from '@crossed/ui';
import type { Props } from '../../props';
import { useState } from 'react';

export const TextareaDemo = ({ size, variant, color }: Props) => {
  const [value, setValue] = useState('');
  return (
    <YBox space="md">
      <Textarea
        label="label"
        size={size}
        variant={variant as any}
        iconAfter={UilEye}
        icon={UilEye}
        color={color}
        onChangeValue={setValue}
        value={value}
      />
      <Textarea
        color={color}
        size={size}
        variant={variant as any}
        onChangeValue={setValue}
        value={value}
      >
        <Textarea.Label aria-label="Label">Label</Textarea.Label>
        <Textarea.Input />
      </Textarea>
    </YBox>
  );
};
