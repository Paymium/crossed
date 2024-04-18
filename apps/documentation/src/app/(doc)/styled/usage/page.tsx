/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { CodeBlock } from '@/components/CodeBlock';
import { H1, H2, P, YBox } from '@crossed/ui';

export default function UsagePage() {
  return (
    <YBox>
      <H1>Usage</H1>

      <H2 id="create">Create style</H2>
      <P>Create a new styles</P>
      <CodeBlock fileName="components/Body.tsx">{`
import { createStyles } from '@crossed/styled';

export const styles = createStyles((t) => ({
  color: {
    base: { color: t.colorText }
  }
}));
`}</CodeBlock>

      <P>Import and use it</P>
      <CodeBlock fileName="app/page.tsx">{`
import { Text } from "react-native";
import { styles } from "./styles";

function App () {
  return <Text {...styles.color.rnw()}>Hello World!</Text>;
}
`}</CodeBlock>
    </YBox>
  );
}
