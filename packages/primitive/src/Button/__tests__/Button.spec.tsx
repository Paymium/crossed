import '@testing-library/jest-dom';
import { render, screen } from '@crossed/test';

import { createButtonMain } from '../Button';
import { ReactNode, forwardRef } from 'react';
import { useContext, Provider, type ContextButton } from '../context';
import { ButtonGroupCollectionItemSlot } from '../contextCollection';
import { Item } from '../../utils/RovingFocus';

jest.mock('../contextCollection');
jest.mock('../context');
jest.mock('../../utils/RovingFocus');

const useContextMocked = useContext as unknown as jest.Mock<ContextButton>;
const ProviderMocked = Provider as unknown as jest.Mock<ReactNode>;
const ItemSlotMocked = (ButtonGroupCollectionItemSlot as any)
  .render as unknown as jest.Mock<ReactNode>;
const RovingItemMocked = (Item as any)
  .render as unknown as jest.Mock<ReactNode>;

const Comp = forwardRef((p: any, ref: any) => <div {...p} ref={ref} />);
const NewComp = createButtonMain(Comp);

describe('createButtonMain', () => {
  beforeEach(() => {
    useContextMocked.mockImplementation(() => ({
      id: 'id',
    }));
    ProviderMocked.mockImplementation(({ children }: any) => <>{children}</>);
    ItemSlotMocked.mockImplementation(({ children }: any) => <>{children}</>);
    RovingItemMocked.mockImplementation(({ children }: any) => <>{children}</>);
  });

  afterEach(() => {
    useContextMocked.mockReset();
    ProviderMocked.mockReset();
    ItemSlotMocked.mockReset();
    RovingItemMocked.mockReset();
  });

  test('not disabled', async () => {
    const child = 'Pass child';
    render(<NewComp>{child}</NewComp>);

    expect(useContextMocked).toHaveBeenCalled();
    expect(ProviderMocked).toHaveBeenCalled();
    expect(ProviderMocked.mock.calls[0][0]).toHaveProperty('id', 'id');
    expect(ProviderMocked.mock.calls[0][0]).toHaveProperty('children');

    expect(ItemSlotMocked).toHaveBeenCalled();
    expect(ItemSlotMocked.mock.calls[0][0]).toHaveProperty('id', 'id');
    expect(ItemSlotMocked.mock.calls[0][0]).toHaveProperty('children');

    expect(RovingItemMocked).toHaveBeenCalled();
    expect(RovingItemMocked.mock.calls[0][0]).toHaveProperty('focusable', true);
    expect(RovingItemMocked.mock.calls[0][0]).toHaveProperty('children');

    const button = await screen.getByRole('button');
    expect(button).toHaveTextContent(child);
    expect(button).toHaveAttribute('aria-labelledby', 'id');
    expect(button).toHaveAttribute('aria-disabled', 'false');
    expect(button).toHaveAttribute('id', 'id');
    expect(button).toHaveAttribute('tabIndex', '0');
  });

  test('disabled', async () => {
    const child = 'Pass child';
    render(<NewComp disabled>{child}</NewComp>);

    expect(useContextMocked).toHaveBeenCalled();
    expect(ProviderMocked).toHaveBeenCalled();
    expect(ProviderMocked.mock.calls[0][0]).toHaveProperty('id', 'id');
    expect(ProviderMocked.mock.calls[0][0]).toHaveProperty('children');

    expect(ItemSlotMocked).toHaveBeenCalled();
    expect(ItemSlotMocked.mock.calls[0][0]).toHaveProperty('id', 'id');
    expect(ItemSlotMocked.mock.calls[0][0]).toHaveProperty('children');

    expect(RovingItemMocked).toHaveBeenCalled();
    expect(RovingItemMocked.mock.calls[0][0]).toHaveProperty(
      'focusable',
      false
    );
    expect(RovingItemMocked.mock.calls[0][0]).toHaveProperty('children');

    const button = await screen.getByRole('button');
    expect(button).toHaveTextContent(child);
    expect(button).toHaveAttribute('aria-labelledby', 'id');
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).toHaveAttribute('disabled', '');
    expect(button).toHaveAttribute('id', 'id');
    expect(button).toHaveAttribute('tabIndex', '-1');
  });
});
