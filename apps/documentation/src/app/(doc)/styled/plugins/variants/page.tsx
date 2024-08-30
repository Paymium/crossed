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
      <H1>Variants</H1>
      <Text>Variants plugin is already include when you import Registry</Text>
      <Text>
        Add <Code>variants</Code> key on your style
      </Text>
      <CodeBlock>{`
createStyles(() => ({
  root:{
    variants: : { 
      foo: {
        true: { /** your style */ },
        false: { /** your style */ }
      }
    }
  }
}))
`}</CodeBlock>
    </YBox>
  );
}
