import { GetProps, merge } from '@crossed/core';
import { createDropdown } from '@crossed/primitive';
import { YBox, Text } from '@crossed/ui';
import type { HTMLAttributes } from 'react';
import { Portal } from '@gorhom/portal';

const Dropdown = createDropdown({
  Root: (props: HTMLAttributes<HTMLDivElement>) => {
    return (
      <div {...props} className={merge(props.className, 'flex flex-col')} />
    );
  },
  Trigger: (props: HTMLAttributes<HTMLButtonElement>) => {
    return (
      <button
        {...props}
        className={merge(
          'flex flex-col p-2 border border-neutral-800 rounded-md',
          props.className
        )}
      />
    );
  },
  Portal,
  Content: (props: GetProps<typeof YBox>) => {
    return (
      <YBox
        {...props}
        className={merge(
          'flex flex-col p-2 border bg-neutral-900 border-neutral-800 rounded-md w-auto',
          props.className
        )}
      />
    );
  },
  Overlay: (props) => <div {...props} />,
});

export const CreateDropdownSimpleDemo = () => {
  return (
    <YBox space="md">
      <Dropdown>
        <Dropdown.Trigger aria-label="Click for toggle nav">
          Hello
        </Dropdown.Trigger>
        <Dropdown.Portal>
          {/* <Dropdown.Overlay /> */}
          <Dropdown.Content aria-activedescendant="test">
            <Text tabIndex={0} role="option" id="test">
              Hello 1
            </Text>
            <Text>Hello 1</Text>
            <Text>Hello 1</Text>
            <Text>Hello 1</Text>
            <Text>Hello 1</Text>
            <Text>Hello 1</Text>
          </Dropdown.Content>
        </Dropdown.Portal>
      </Dropdown>
    </YBox>
  );
};
