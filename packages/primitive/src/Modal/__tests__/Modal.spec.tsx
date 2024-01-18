import '@testing-library/jest-dom';
import { render } from '@crossed/test';

import { createModalMain } from '../Modal';
import React, { ReactNode, forwardRef } from 'react';
import { Provider } from '../context';
import { useUncontrolled } from '@crossed/core/src/useUncontrolled';

jest.mock('../context');
jest.mock('@crossed/core/src/useUncontrolled');

const useUncontrolledMocked = useUncontrolled as unknown as jest.Mock<
  ReturnType<typeof useUncontrolled>
>;
const ProviderMocked = Provider as unknown as jest.Mock<ReactNode>;

const Comp = forwardRef((p: any, ref: any) => <div {...p} ref={ref} />);
const NewComp = createModalMain(Comp);

describe('createModalMain', () => {
  const oldUseId = React.useId;

  beforeEach(() => {
    React.useId = jest.fn(() => 'id');
    ProviderMocked.mockImplementation(({ children }: any) => <>{children}</>);
    useUncontrolledMocked.mockImplementation(() => [false, () => {}] as any);
  });

  afterEach(() => {
    React.useId = oldUseId;
    ProviderMocked.mockReset();
    useUncontrolledMocked.mockReset();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('simple', async () => {
    render(<NewComp />);

    expect(React.useId).toHaveBeenCalled();

    // expect(useUncontrolledMocked).toHaveBeenCalled();
    // expect(useUncontrolledMocked.mock.calls[0][0]).toHaveProperty(
    //   'value',
    //   undefined
    // );
    // expect(useUncontrolledMocked.mock.calls[0][0]).toHaveProperty(
    //   'defaultValue',
    //   false
    // );
    // expect(useUncontrolledMocked.mock.calls[0][0]).toHaveProperty(
    //   'onChange',
    //   undefined
    // );

    expect(ProviderMocked).toHaveBeenCalled();
    expect(ProviderMocked.mock.calls[0][0]).toHaveProperty('id', 'id');
    expect(ProviderMocked.mock.calls[0][0]).toHaveProperty('open', false);
    expect(ProviderMocked.mock.calls[0][0]).toHaveProperty('children');
  });
});
