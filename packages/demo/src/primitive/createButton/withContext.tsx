import { createButton } from '@crossed/primitive';
import { Box } from '@crossed/ui';

const Button = createButton(
  {
    Root: (props) => {
      return <button className="bg-blue-500" {...props} />;
    },
    Text: () => {
      // const { title } = useButtonContext();
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
      <Button>
        <Button.Text title="text button" />
      </Button>
    </Box>
  );
};
