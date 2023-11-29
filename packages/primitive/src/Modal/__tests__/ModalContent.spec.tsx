import '@testing-library/jest-dom';
import { render, screen } from '@crossed/test';

import { createModalContent } from '../ModalContent';
import { ReactNode, forwardRef } from 'react';
import { ContextModal, useContext } from '../context';
import { FocusScope } from '../../utils/FocusScope';

jest.mock('../context');
jest.mock('../../utils/FocusScope');

const useContextMocked = useContext as unknown as jest.Mock<
  ReturnType<typeof useContext>
>;
const FocusScopeMocked = (FocusScope as any)
  .render as unknown as jest.Mock<ReactNode>;
const Comp = forwardRef((p: any, ref: any) => <div {...p} ref={ref} />);
const NewComp = createModalContent(Comp);

describe('createModalContent', () => {
  beforeEach(() => {
    useContextMocked.mockImplementation(() => ({ id: 'id' } as ContextModal));
    FocusScopeMocked.mockImplementation((e) => e.children);
  });

  afterEach(() => {
    useContextMocked.mockReset();
    FocusScopeMocked.mockReset();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('simple', async () => {
    render(<NewComp />);

    expect(useContextMocked).toHaveBeenCalled();

    expect(FocusScopeMocked.mock.calls[0][0]).toHaveProperty('trapped', true);
    expect(FocusScopeMocked.mock.calls[0][0]).toHaveProperty('loop', true);

    const el = await screen.getByRole('dialog');
    expect(el).toHaveAttribute('aria-modal', 'true');
    expect(el).toHaveAttribute('aria-labelledby', 'id-title');
    expect(el).toHaveAttribute('aria-describedby', 'id-description');
  });
});
