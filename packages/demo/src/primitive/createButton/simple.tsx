import { createButton } from '@crossed/primitive';
import { Box } from '@crossed/ui';

const Button = createButton({
  Root: (props) => {
    return <button className="bg-blue-500" {...props} />;
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
      <Button>
        <Button.Text title="text button" />
      </Button>
    </Box>
  );
};
