import '@testing-library/jest-dom';
import { createLabel } from '../createLabel';
import { useContext, type ContextLabel } from '../context';
import { render, screen } from '@crossed/test';

jest.mock('../context');
const Comp = (p: any) => <p {...p} />;
const NewComp = createLabel(Comp);

const useContextMocked = useContext as unknown as jest.Mock<ContextLabel>;

describe('createLabel', () => {
  beforeEach(() => {
    useContextMocked.mockImplementation(() => ({
      id: 'id',
    }));
  });

  afterEach(() => {
    useContextMocked.mockReset();
  });

  test('add id to comp', async () => {
    const child = 'Pass child';
    render(<NewComp>{child}</NewComp>);

    expect(useContextMocked).toHaveBeenCalled();

    const text = await screen.getByText(child);
    expect(text).toHaveAttribute('id', 'id');
  });
});
