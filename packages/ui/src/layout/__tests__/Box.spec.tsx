import { Box } from '../Box';
import '@testing-library/jest-dom';

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
