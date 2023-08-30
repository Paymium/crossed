import { merge } from '@crossed/styled';
import { createLabel } from '@crossed/primitive';
import { YBox } from '@crossed/ui';
import type { HTMLAttributes } from 'react';

const Label = createLabel({
  Root: (props: HTMLAttributes<HTMLDivElement>) => {
    return (
      <div {...props} className={merge('flex flex-col', props.className)} />
    );
  },
  Text: (props: HTMLAttributes<HTMLLabelElement>) => {
    return (
      <label {...props} className={merge('flex flex-col', props.className)} />
    );
  },
});

export const CreateLabelSimpleDemo = () => {
  return (
    <YBox space="md">
      <Label>
        <Label.Text aria-label="Input">Input</Label.Text>
        <Label.Input>
          <input type="text" className="border border-neutral-800" />
        </Label.Input>
      </Label>

      <Label>
        <Label.Text aria-label="Select">Select</Label.Text>
        <Label.Input>
          <select className="border border-neutral-800">
            <option value="Integer consequat">Integer consequat</option>
            <option value="Maecenas sed sem">Maecenas sed sem</option>
            <option value="Vestibulum lacinia">Vestibulum lacinia</option>
            <option value="Quisque ornare">Quisque ornare</option>
          </select>
        </Label.Input>
      </Label>

      <Label className="flex-row gap-2">
        <Label.Input>
          <input type="checkbox" />
        </Label.Input>
        <Label.Text aria-label="Checkbox">Checkbox</Label.Text>
      </Label>

      <Label className="flex-row gap-2">
        <Label.Input>
          <input type="radio" />
        </Label.Input>
        <Label.Text aria-label="Radio">Radio</Label.Text>
      </Label>

      <Label className="flex-row gap-2">
        <Label.Input>
          <input type="radio" />
        </Label.Input>
        <Label.Text aria-label="Radio">Radio</Label.Text>
      </Label>
    </YBox>
  );
};
