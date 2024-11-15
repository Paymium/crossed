/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { render } from '@crossed/test';
import { FloatingRef, FloatingRoot } from '../Root';
import { FloatingProvider } from '../context';
import { act, createRef } from 'react';

jest.mock('../context', () => ({
  ...jest.requireActual('../context'),
  FloatingProvider: jest.fn(() => null),
}));

const FloatingProviderMocked = jest.mocked(FloatingProvider);

describe('Floating.Root', () => {
  const mount = (defaultOpen?: boolean) => {
    const onChange = jest.fn();
    const ref = createRef<FloatingRef>();
    expect(FloatingRoot.displayName).toEqual('Floating');

    render(
      <FloatingRoot onChange={onChange} defaultValue={defaultOpen} ref={ref} />
    );
    return { ref };
  };

  afterEach(() => {
    FloatingProviderMocked.mockReset();
  });

  test('verify based props', async () => {
    const { ref } = mount();
    const call = FloatingProviderMocked.mock.calls[0][0];
    expect(call).toHaveProperty('children', undefined);
    expect(call).toHaveProperty('closeOverlayPress', true);
    expect(call).toHaveProperty('onClose');
    expect(call).toHaveProperty('onOpen');
    expect(call).toHaveProperty('open', false);
    expect(call).toHaveProperty('removeScroll', true);
    expect(call).toHaveProperty('visibilityHidden', undefined);
    expect(call).toHaveProperty('wait', 0);
    expect(ref.current).toHaveProperty('onOpen');
    expect(ref.current).toHaveProperty('onClose');
  });

  test('check imperative handle onOpen', async () => {
    mount();
    expect(FloatingProviderMocked).toHaveBeenCalledTimes(1);
    const call = FloatingProviderMocked.mock.calls[0][0];
    await act(() => Promise.resolve(call.onOpen()));
    expect(FloatingProviderMocked).toHaveBeenCalledTimes(2);
    const call2 = FloatingProviderMocked.mock.calls[1][0];
    expect(call2).toHaveProperty('open', true);
  });
  test('check imperative handle onClose', async () => {
    mount(true);
    expect(FloatingProviderMocked).toHaveBeenCalledTimes(1);
    const call = FloatingProviderMocked.mock.calls[0][0];
    await act(() => Promise.resolve(call.onClose()));
    expect(FloatingProviderMocked).toHaveBeenCalledTimes(2);
    const call2 = FloatingProviderMocked.mock.calls[1][0];
    expect(call2).toHaveProperty('open', false);
  });
});
