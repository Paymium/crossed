/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Box } from '../Box';
import '@testing-library/jest-dom';

import { describe, test } from '@jest/globals';

import { render, screen } from '@crossed/test';
import { Text } from 'react-native';

describe('Box', () => {
  test('init', async () => {
    const child = 'Pass child';
    render(
      <Box>
        <Text>{child}</Text>
      </Box>
    );

    await screen.findByText(child);
  });
});
