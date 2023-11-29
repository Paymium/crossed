import '@testing-library/jest-dom';
import { render, screen } from '@crossed/test';

import { createModalDescription } from '../ModalDescription';
import { forwardRef } from 'react';
import { ContextModal, useContext } from '../context';

jest.mock('../context');

const useContextMocked = useContext as unknown as jest.Mock<
  ReturnType<typeof useContext>
>;
const Comp = forwardRef((p: any, ref: any) => <div {...p} ref={ref} />);
const NewComp = createModalDescription(Comp);

describe('createModalDescription', () => {
  beforeEach(() => {
    useContextMocked.mockImplementation(() => ({ id: 'id' } as ContextModal));
  });

  afterEach(() => {
    useContextMocked.mockReset();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('simple', async () => {
    render(<NewComp>h</NewComp>);

    expect(useContextMocked).toHaveBeenCalled();

    const el = await screen.getByText('h');
    expect(el).toHaveAttribute('id', 'id-description');
  });
});
