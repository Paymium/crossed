import '@testing-library/jest-dom';
import { createInputInput } from '../createInput';
import { useContext, type ContextLabel } from '../context';
import { render, screen } from '@crossed/test';

jest.mock('../context');
const Comp = (p: any) => (
  <input {...p} aria-labelledby={p.ariaLabelledby} placeholder="toFindInput" />
);
const NewComp = createInputInput(Comp);

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

  test('add aria-labelledBy to comp', async () => {
    render(<NewComp />);

    expect(useContextMocked).toHaveBeenCalled();

    const input = await screen.getByPlaceholderText('toFindInput');
    expect(input).toHaveAttribute('aria-labelledby', 'id');
  });
});
