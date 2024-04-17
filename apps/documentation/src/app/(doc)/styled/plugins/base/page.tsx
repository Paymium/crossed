/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { CodeBlock } from '@/components/CodeBlock';
import '@/style.config';
import { Code, H1, Text, YBox } from '@crossed/ui';

export default function PluginsPage() {
  return (
    <YBox space="md">
      <H1>Base</H1>
      <Text>Base plugin is already include when you import Registry</Text>
      <Text>
        Add <Code>base</Code> key on your style
      </Text>
      <CodeBlock>{`
createStyles(() => ({
  root:{
    base: { /** your style */ }
  }
}))
`}</CodeBlock>
    </YBox>
  );
}
