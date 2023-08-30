import { createButton } from '@crossed/primitive';
import { Box } from '@crossed/ui';
import type { HTMLAttributes } from 'react';

const Button = createButton(
  {
    Root: (props: HTMLAttributes<HTMLButtonElement>) => {
      return (
        <button
          className="bg-blue-500 px-3 py-2 gap-2 flex flex-row justify-center"
          {...props}
        />
      );
    },
    Text: ({ title }: { title?: string }) => {
      return <span className="text-white">{title}</span>;
    },
    Icon: () => {
      return <span>€</span>;
    },
  },
  {
    context: {
      title: 'Hello World!',
    },
  }
);

export const CreateButtonWithContextDemo = () => {
  return (
    <Box space="sm">
      <Button aria-label="Button">
        <Button.Icon />
        <Button.Text />
      </Button>
      <Button aria-label="Button change title" title="Context title">
        <Button.Icon />
        <Button.Text />
      </Button>
      <Button aria-label="Button change title" title="Context title">
        <Button.Text title="or here" />
        <Button.Icon />
      </Button>
    </Box>
  );
};
