import { createModal } from '@crossed/primitive';
import { Text } from '@crossed/ui';
import { Fragment } from 'react';
import { Portal } from '@gorhom/portal';
import { styled } from '@crossed/styled';
import { Pressable, View } from 'react-native';

const HeaderModal = styled(View, {
  className: ['flex flex-row justify-between'],
});

const Modal = createModal({
  Portal,
  Root: Fragment,
  Trigger: styled(Pressable, {
    className: ['cursor-pointer'],
    props: { role: 'button' },
  }),
  Title: styled(Text, { className: ['text-2xl text-white'] }),
  Overlay: styled(Pressable, {
    className: ['absolute inset-0 bg-neutral-800/50 z-20', 'cursor-default'],
  }),
  Content: styled(View, {
    className: [
      'bg-neutral-800 z-20 flex flex-col',
      'border border-neutral-700 rounded-md px-5 py-4 m-auto',
      'fixed md:top-[50%] md:bottom-auto left-0 right-0 md:-translate-y-[50%] bottom-0',
      'md:w-1/2 gap-2 max-h-full',
    ],
  }),
  Description: styled(Text, { className: ['text-base text-white'] }),
});

export const CreateModalSimpleDemo = () => {
  return (
    <Modal>
      <Modal.Trigger aria-label="Open Modal">
        <Text>Open</Text>
      </Modal.Trigger>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content>
          <HeaderModal>
            <Modal.Title className="flex-1">Title Modal</Modal.Title>
            <Modal.Trigger aria-label="Close modal">
              <Text className="text-white">X</Text>
            </Modal.Trigger>
          </HeaderModal>
          <Modal.Description>
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
          </Modal.Description>
        </Modal.Content>
      </Modal.Portal>
    </Modal>
  );
};
