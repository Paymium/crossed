import { createButton } from '@crossed/primitive';
import { Box } from '@crossed/ui';
import type { HTMLAttributes } from 'react';

const Button = createButton(
  {
    Root: (props: HTMLAttributes<HTMLButtonElement>) => {
      return <button className="bg-blue-500 px-3 py-2" {...props} />;
    },
    Text: () => {
      return <span className="text-white">{'title'}</span>;
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
    <Box>
      <Button aria-label="Button example">
        <Button.Text title="text button" />
      </Button>
    </Box>
  );
};
