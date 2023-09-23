import { createSheet } from '@crossed/primitive';
import { Button, Text } from '@crossed/ui';
import { Fragment, type HTMLAttributes } from 'react';
import { Portal } from '@gorhom/portal';
import { useWindowDimensions } from 'react-native';

const Sheet = createSheet({
  Content: ({ children, ...props }: HTMLAttributes<HTMLDivElement>) => {
    const { height } = useWindowDimensions();
    return (
      <div className="absolute top-0 w-full" style={{ height }} {...props}>
        <div className="absolute bottom-0 bg-neutral-800 z-20 border border-neutral-700 rounded-md px-5 py-4 overflow-auto">
          {children}
        </div>
      </div>
    );
  },
  Portal,
  Root: Fragment,
  Trigger: (props: HTMLAttributes<HTMLButtonElement>) => {
    return <button {...props} />;
  },
  Overlay: (props: HTMLAttributes<HTMLDivElement>) => {
    return (
      <div {...props} className="absolute inset-0 bg-neutral-800/50 z-20" />
    );
  },
});

export const CreateSheetSimpleDemo = () => {
  return (
    <Sheet>
      <Sheet.Trigger aria-label="Open sheet">Open</Sheet.Trigger>
      <Sheet.Portal>
        <Sheet.Overlay />
        <Sheet.Content>
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
          <Button aria-label="Click for random change snappoints props">
            <Button.Text>Change snapPoints</Button.Text>
          </Button>
        </Sheet.Content>
      </Sheet.Portal>
    </Sheet>
  );
};
