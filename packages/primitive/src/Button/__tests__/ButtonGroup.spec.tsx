/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import '@testing-library/jest-dom';
import { render, screen } from '@crossed/test';
import { ReactNode, forwardRef } from 'react';

import { createButtonGroup } from '../ButtonGroup';
import { ProviderGroup } from '../contextGroup';
import { RovingFocusGroup } from '../../utils/RovingFocus';
import { ButtonGroupCollection } from '../contextCollection';

const Comp = forwardRef((p: any, ref: any) => <p {...p} ref={ref} />);
const NewComp = createButtonGroup(Comp);

jest.mock('../contextGroup');
jest.mock('../contextCollection');
jest.mock('../../utils/RovingFocus');

const ProviderMocked = ProviderGroup as unknown as jest.Mock<ReactNode>;
const RovingFocusGroupMocked = (RovingFocusGroup as any)
  .render as unknown as jest.Mock<ReactNode>;
const CollectionProviderMocked =
  ButtonGroupCollection.Provider as unknown as jest.Mock<ReactNode>;
const CollectionSlotMocked = (ButtonGroupCollection.Slot as any)
  .render as unknown as jest.Mock<ReactNode>;

describe('createButtonGroup', () => {
  beforeEach(() => {
    ProviderMocked.mockImplementation(({ children }: any) => <>{children}</>);
    RovingFocusGroupMocked.mockImplementation(({ children }: any) => (
      <>{children}</>
    ));
    CollectionProviderMocked.mockImplementation(({ children }: any) => (
      <>{children}</>
    ));
    CollectionSlotMocked.mockImplementation(({ children }: any) => (
      <>{children}</>
    ));
  });

  afterEach(() => {
    ProviderMocked.mockReset();
    RovingFocusGroupMocked.mockReset();
    CollectionProviderMocked.mockReset();
    CollectionSlotMocked.mockReset();
  });

  test('init', async () => {
    const child = 'Pass child';
    render(<NewComp>{child}</NewComp>);

    expect(ProviderMocked).toHaveBeenCalled();
    expect(ProviderMocked.mock.lastCall[0]).toHaveProperty('children');
    expect(ProviderMocked.mock.lastCall[0]).toHaveProperty('grouped', true);
    expect(ProviderMocked.mock.lastCall[0]).toHaveProperty(
      'orientation',
      'horizontal'
    );

    expect(RovingFocusGroupMocked).toHaveBeenCalled();
    expect(RovingFocusGroupMocked.mock.lastCall[0]).toHaveProperty('children');
    expect(RovingFocusGroupMocked.mock.lastCall[0]).toHaveProperty(
      'orientation',
      'horizontal'
    );

    expect(CollectionProviderMocked).toHaveBeenCalled();
    expect(CollectionProviderMocked.mock.lastCall[0]).toHaveProperty(
      'children'
    );

    expect(CollectionSlotMocked).toHaveBeenCalled();
    expect(CollectionSlotMocked.mock.lastCall[0]).toHaveProperty('children');

    await screen.getByText(child);
  });
});
