import { createInput } from '@crossed/primitive';
import type { HTMLAttributes } from 'react';

const Input = createInput({
  Group: (props: HTMLAttributes<HTMLDivElement>) => {
    return <div {...props} className=" " />;
  },
  Icon: (props: HTMLAttributes<HTMLSpanElement>) => {
    return <span {...props} />;
  },
  Input: (props: HTMLAttributes<HTMLInputElement>) => {
    return (
      <input
        type="text"
        {...props}
        className="border border-neutral-800 px-2 py-1 bg-transparent"
      />
    );
  },
});

export const CreateInputSimpleDemo = () => {
  return (
    <>
      <Input />
      <Input.Group>
        <Input.Icon>¥</Input.Icon>
        <Input />
      </Input.Group>
    </>
  );
};
