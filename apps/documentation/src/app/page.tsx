'use client';
import '../types/unistyles';
import { Text } from '@/components/Text';
import { Text as T } from 'react-native';
import { createStyleSheet, styled, useStyles } from '@crossed/styled';

const F = styled(T, {
  color: 'green',
});

const styleSheet = createStyleSheet({ base: { color: 'violet' } });

export default function Home() {
  const { styles, theme } = useStyles(styleSheet);
  console.log(theme);
  return (
    <main>
      <Text>Hello world</Text>
      <F>Toto</F>
      <T style={styles.base}>basic</T>
    </main>
  );
}
