import { createModal } from '@crossed/primitive';
import { Text } from '@crossed/ui';
import { Fragment, forwardRef, type HTMLAttributes } from 'react';
import { Portal } from '@gorhom/portal';

const Modal = createModal({
  Content: forwardRef((props: HTMLAttributes<HTMLDivElement>, ref: any) => {
    return (
      <div
        ref={ref}
        {...props}
        className="bg-neutral-800 z-20 border border-neutral-700 rounded-md px-5 py-4"
      />
    );
  }),
  Portal,
  Root: Fragment,
  Trigger: (props: HTMLAttributes<HTMLButtonElement>) => {
    return <button {...props} />;
  },
  Overlay: forwardRef((props: HTMLAttributes<HTMLDivElement>, ref: any) => {
    return (
      <div
        ref={ref}
        {...props}
        className="absolute inset-0 bg-neutral-800/50 z-20"
      />
    );
  }),
});

export const CreateModalSimpleDemo = () => {
  return (
    <Modal>
      <Modal.Trigger aria-label="Open Modal">Open</Modal.Trigger>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            laoreet dapibus metus, vel fringilla eros imperdiet id. Maecenas
            fermentum lorem gravida massa sagittis, vel ultricies risus
            convallis. Ut sodales dui sit amet velit laoreet cursus. Mauris vel
            sapien non lorem sodales facilisis. Fusce ut enim et ante tristique
            placerat eget eget massa. Maecenas erat libero, commodo id urna eu,
            convallis auctor mi. Pellentesque eleifend nibh vitae lacinia
            sagittis. Nullam et consectetur lacus, quis porttitor ipsum. Nullam
            sed purus id libero elementum auctor vel sit amet nulla. Nulla
            placerat elit at dignissim egestas. Quisque sed sagittis ante, et
            ultrices diam. In at efficitur diam. Pellentesque quis molestie
            lorem. Vestibulum volutpat volutpat luctus. Donec massa arcu,
            suscipit quis magna non, congue scelerisque nisl. Duis ligula lorem,
            ullamcorper et consectetur vitae, consequat ac sem.
          </Text>
        </Modal.Content>
      </Modal.Portal>
    </Modal>
  );
};
