/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { YBox, H1, Button, Box, Text } from '@crossed/ui';
import { createStyles, useStyles, withStyle } from '@crossed/styled';
import { Text as NText } from 'react-native';

const TextTheme = withStyle(NText, {
  variants: {
    color: {
      green: {
        base: { color: 'green' },
      },
    },
  },
  media: {
    xs: { color: 'red' },
    sm: { color: 'green' },
    md: { color: 'violet' },
    lg: { color: 'blue' },
  },
});

const globalStyles = createStyles({
  container: { base: { paddingHorizontal: 15 } },
  text: { base: { color: 'black' } },
});

export default function TabOneScreen() {
  const { styles } = useStyles(globalStyles);
  return (
    <YBox space="lg" style={styles.container.style}>
      <H1 style={styles.text.style}>Heading</H1>
      <TextTheme style={styles.text.style}>Text</TextTheme>
      <Button>
        <TextTheme>Hello</TextTheme>
      </Button>
      <Button variant="outlined" aria-label="Press">
        <Button.Text style={styles.text.style}>Press</Button.Text>
      </Button>
      <YBox>
        <Box>
          <Text style={styles.text.style}>Hello</Text>
        </Box>
        <Box>
          <Text style={styles.text.style}>Hello</Text>
        </Box>
      </YBox>
    </YBox>
  );
}
