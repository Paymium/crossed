/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { CodeBlock } from '@/components/CodeBlock';
import '@/style.config';
import { Card, H1, Kbd, Text, YBox } from '@crossed/ui';

export default function PluginsPage() {
  return (
    <YBox space="md">
      <H1>Pseudo class</H1>
      <Card space="sm">
        <Text>
          Pseudo class plugin is already include when you import Registry
        </Text>
        <Text>
          Add <Kbd>:focus</Kbd>,<Kbd>:hover</Kbd>,<Kbd>:active</Kbd>,
          <Kbd>:focus-visible</Kbd> and <Kbd>:disabled</Kbd> key on your style
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
      </Card>
    </YBox>
  );
}
