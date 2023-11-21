import { createSheet } from '@crossed/primitive';
import { Text } from '@crossed/ui';
import { Fragment } from 'react';
import { Portal } from '@gorhom/portal';
import { Pressable, TextInput, View } from 'react-native';
import { styled } from '@crossed/styled';

const Sheet = createSheet({
  Content: styled(View, {
    className: [
      'bg-neutral-800 z-20 flex flex-col',
      'border border-neutral-700 rounded-md px-5 py-4 m-auto',
      'fixed left-0 right-0 bottom-0',
      'gap-2 max-h-full',
    ],
  }),
  Portal,
  Root: Fragment,
  Trigger: styled(Pressable, { className: ['cursor-pointer'] }),
  Overlay: styled(Pressable, {
    className: ['absolute inset-0 bg-neutral-800/50 z-20', 'cursor-default'],
  }),
  Handle: styled(Pressable, {
    className: ['bg-neutral-900/70 rounded-lg w-1/3 mx-auto', 'h-2'],
    props: { role: 'button' },
  }),
});

export const CreateSheetSimpleDemo = () => {
  return (
    <Sheet>
      <Sheet.Trigger aria-label="Open sheet">Open</Sheet.Trigger>
      <Sheet.Portal>
        <Sheet.Overlay />
        <Sheet.Content>
          <Sheet.Handle />
          <TextInput />
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
        </Sheet.Content>
      </Sheet.Portal>
    </Sheet>
  );
};
