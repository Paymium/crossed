import { GetProps, merge } from '@crossed/styled';
import { createDropdown, useDropdownContext } from '@crossed/primitive';
import { YBox, Text } from '@crossed/ui';
import {
  type HTMLAttributes,
  forwardRef,
  PropsWithChildren,
  HtmlHTMLAttributes,
} from 'react';
import { Portal } from '@gorhom/portal';
import { composeRefs, createScope } from '@crossed/core';
import {
  FloatingFocusManager,
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';

type FloatingProvider = ReturnType<typeof useFloating> &
  ReturnType<typeof useInteractions>;

const [FloatingProvider, useFloatingProvider] = createScope<FloatingProvider>(
  {} as FloatingProvider
);

const Dropdown = createDropdown({
  Root: (props: HTMLAttributes<HTMLDivElement>) => {
    const { open, setOpen } = useDropdownContext();
    const floating = useFloating({
      open: open,
      onOpenChange: setOpen,
      middleware: [offset(10), flip(), shift()],
      whileElementsMounted: autoUpdate,
    });

    const { context } = floating;

    const click = useClick(context);
    const dismiss = useDismiss(context);
    const role = useRole(context);

    const interactions = useInteractions([click, dismiss, role]);
    return (
      <FloatingProvider {...floating} {...interactions}>
        <div {...props} className={merge(props.className, 'flex flex-col')} />
      </FloatingProvider>
    );
  },
  Trigger: forwardRef((props: HTMLAttributes<HTMLButtonElement>, ref: any) => {
    const { getReferenceProps, refs } = useFloatingProvider();
    return (
      <button
        {...getReferenceProps()}
        {...props}
        ref={composeRefs(refs.setReference, ref)}
        className={merge(
          'flex flex-col p-2 border border-neutral-800 rounded-md',
          props.className
        )}
      />
    );
  }),
  Portal: ({ children }: PropsWithChildren) => {
    const context = useFloatingProvider();
    return (
      <Portal>
        <FloatingProvider {...context}>{children}</FloatingProvider>
      </Portal>
    );
  },
  Content: (props: HtmlHTMLAttributes<HTMLDivElement>) => {
    const { refs, floatingStyles, getFloatingProps } = useFloatingProvider();

    return (
      <div
        ref={refs.setFloating}
        {...getFloatingProps()}
        {...props}
        style={{ ...props.style, ...floatingStyles, zIndex: 30 }}
        className={merge(
          'flex flex-col p-2 border bg-neutral-900 border-neutral-800 rounded-md w-auto',
          props.className
        )}
      />
    );
  },
  Item: forwardRef((props: HtmlHTMLAttributes<HTMLButtonElement>, ref: any) => {
    return (
      <button
        {...props}
        ref={ref}
        className="text-left rounded px-2 py-1 hover:bg-neutral-800"
      />
    );
  }),
  Label: forwardRef((props: HtmlHTMLAttributes<HTMLDivElement>, ref: any) => {
    return <div {...props} ref={ref} className="text-neutral-500 px-2 py-1" />;
  }),
  Divider: forwardRef((props: HtmlHTMLAttributes<HTMLDivElement>, ref: any) => {
    return (
      <div {...props} ref={ref} className="border-t border-neutral-800 my-1" />
    );
  }),
});

export const CreateDropdownSimpleDemo = () => {
  return (
    <YBox space="md">
      <Dropdown>
        <Dropdown.Trigger aria-label="Click for toggle nav">
          Hello
        </Dropdown.Trigger>
        <Dropdown.Portal>
          <Dropdown.Content>
            <Dropdown.Label>Application</Dropdown.Label>
            <Dropdown.Item aria-label="Settings">Settings</Dropdown.Item>
            <Dropdown.Item aria-label="Settings">Messages</Dropdown.Item>
            <Dropdown.Item aria-label="Settings">Gallery</Dropdown.Item>

            <Dropdown.Divider />

            <Dropdown.Label>Danger zone</Dropdown.Label>
            <Dropdown.Item aria-label="Transfer my data">
              Transfer my data
            </Dropdown.Item>
            <Dropdown.Item aria-label="Delete my account">
              Delete my account
            </Dropdown.Item>
            <Dropdown.Item disabled aria-label="Settings">
              Users (not right)
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Portal>
      </Dropdown>
    </YBox>
  );
};
