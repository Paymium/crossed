import { createButton } from '@crossed/primitive';
import { styled } from '@crossed/styled';
import { Box } from '@crossed/ui';
import type { HTMLAttributes } from 'react';
import { Pressable } from 'react-native';

const Button = createButton({
  Group: styled(Pressable, {}),
  Root: (props: HTMLAttributes<HTMLButtonElement>) => {
    return (
      <button
        className="flex flex-row items-center bg-blue-500 px-3 py-2 hover:bg-blue-400 gap-2 rounded"
        {...props}
      />
    );
  },
  Text: (props: any) => {
    return <span className="text-white" {...props} />;
  },
  Element: (props: HTMLAttributes<HTMLSpanElement>) => {
    return <span {...props} />;
  },
});

export const CreateButtonDemo = () => {
  return (
    <Box>
      <Button aria-label="Button text">
        <Button.Element>€</Button.Element>
        <Button.Text>text button</Button.Text>
      </Button>
    </Box>
  );
};
