import { createButton } from '@crossed/primitive';
import { Box } from '@crossed/ui';
import type { HTMLAttributes } from 'react';

const Button = createButton({
  Root: (props: HTMLAttributes<HTMLButtonElement>) => {
    return (
      <button className="bg-blue-500 px-3 py-2 hover:bg-blue-400" {...props} />
    );
  },
  Text: ({ title }: { title: string }) => {
    return <span className="text-white">{title}</span>;
  },
  Icon: () => {
    return <span>€</span>;
  },
});

export const CreateButtonDemo = () => {
  return (
    <Box>
      <Button aria-label="Button text">
        <Button.Text title="text button" />
      </Button>
    </Box>
  );
};
