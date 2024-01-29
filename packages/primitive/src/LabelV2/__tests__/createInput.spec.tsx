import '@testing-library/jest-dom';
import { createInput } from '../index';
import { createRoot } from '../createRoot';
import { createLabel } from '../createLabel';
import { createInputInput } from '../createInput';

const createRootMocked = createRoot as unknown as jest.Mock<any>;
const createLabelMocked = createLabel as unknown as jest.Mock<any>;
const createInputInputMocked = createInputInput as unknown as jest.Mock<any>;

jest.mock('../createRoot');
jest.mock('../createLabel');
jest.mock('../createInput');

describe('createButton', () => {
  beforeEach(() => {
    createRootMocked.mockImplementation((e: any) => e);
    createLabelMocked.mockImplementation((e: any) => e);
    createInputInputMocked.mockImplementation((e: any) => e);
  });

  afterEach(() => {
    createRootMocked.mockReset();
    createLabelMocked.mockReset();
    createInputInputMocked.mockReset();
  });

  test('init', async () => {
    const Root = (p: any) => <p {...p} />;
    const Input = (p: any) => <p {...p} />;
    const Label = (p: any) => (<p {...p} />) as any;

    const MyLabel = createInput({
      Root,
      Input,
      Label,
    });

    expect(createRootMocked).toHaveBeenCalledWith(Root);
    expect(createLabelMocked).toHaveBeenCalledWith(Label);
    expect(createInputInputMocked).toHaveBeenCalledWith(Input);

    expect(MyLabel.Label).toHaveProperty('id', 'label.label');
  });
});
