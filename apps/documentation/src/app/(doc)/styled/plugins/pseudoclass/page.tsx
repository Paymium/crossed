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
      <H1>Pseudo class</H1>
      <Text>
        Pseudo class plugin is already include when you import Registry
      </Text>
      <Text>
        Add <Code>:focus</Code>,<Code>:hover</Code>,<Code>:active</Code>,
        <Code>:focus-visible</Code> and <Code>:disabled</Code> key on your style
      </Text>
      <CodeBlock>{`
createStyles(() => ({
  root:{
    ':focus': : { /** your style */ }
    ':hover': : { /** your style */ }
    ':active': : { /** your style */ }
    ':focus-visible': : { /** your style */ }
  }
}))
`}</CodeBlock>
    </YBox>
  );
}
