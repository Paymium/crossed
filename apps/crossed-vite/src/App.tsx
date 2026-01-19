import './App.css';
import { createStyles } from '@crossed/styled';
import { Button } from '@crossed/ui';

const buttonVariant = createStyles(() => ({
  classic: {
    base: { backgroundColor: 'black', color: 'white' },
  },
  red: { base: { backgroundColor: 'red', color: 'green' } },
}));

function App() {
  return (
    <>
      <button {...buttonVariant.classic.className()}>classic</button>
      <button {...buttonVariant.red.className()}>red</button>
      <Button>
        <Button.Text>Hello</Button.Text>
      </Button>
    </>
  );
}

export default App;
