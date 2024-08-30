/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import '@testing-library/jest-dom';

import { Focus, useFocus } from '../Focus';
import { View } from 'react-native';

describe('Accordion Focus RN', () => {
  test('Component', async () => {
    expect(Focus).toBe(View);
  });
  test('useFocus', async () => {
    const onPress = jest.fn();
    const params = useFocus({ onPress });
    expect(Object.keys(params)).toEqual(['onKeyDown']);
    params.onKeyDown({} as any);
    expect(onPress).toBeCalledTimes(0);
  });
});
