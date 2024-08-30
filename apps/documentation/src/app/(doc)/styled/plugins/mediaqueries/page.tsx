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
      <H1>Media queries</H1>
      <Text>
        Media queries plugin is already include when you import Registry
      </Text>
      <Text>
        Add <Code>media</Code> key on your style
      </Text>
      <CodeBlock>{`
const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
};

createStyles(() => ({
  root:{
    media: { 
      xs?: { /** your style */ },
      sm?: { /** your style */ },
      md?: { /** your style */ },
      lg?: { /** your style */ },
      xl?: { /** your style */ },
     }
  }
}))
`}</CodeBlock>
    </YBox>
  );
}
