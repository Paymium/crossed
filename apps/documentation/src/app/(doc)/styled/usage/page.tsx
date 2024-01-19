/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { CodeBlock } from '@/components/CodeBlock';
import '@/types/unistyles';
import { H1, H2, P, YBox } from '@crossed/ui';

export default function UsagePage() {
  return (
    <YBox>
      <H1>Usage</H1>

      <H2 id="create">Create component</H2>
      <P>Create a new component by extending a react-native component</P>
      <CodeBlock language="tsx" fileName="components/Body.tsx">{`
import { styled, type GetProps } from '@crossed/styled';
import { Text } from "react-native";

export const Body = styled(Text, {
  color: "red"
});

export type BodyProps = GetProps<typeof Body>;
      `}</CodeBlock>

      <P>Import and use it</P>
      <CodeBlock language="tsx" fileName="app/page.tsx">{`
import { Body } from "../components/Body";

function App () {
  return <Body>Hello World!</Body>;
}
      `}</CodeBlock>

      <H2 id="extend">Extend component</H2>
      <P>You can extending from existing one </P>
      <CodeBlock language="tsx" fileName="components/Heading.tsx">{`
import { type GetProps, styled } from '@crossed/styled';
import { Body } from "../components/Body";

export const Heading = styled(Body, {
  color: "orange"
});

export type HeadingProps = GetProps<typeof Heading>;
      `}</CodeBlock>

      <P>Import and use it</P>
      <CodeBlock language="tsx" fileName="app/page.tsx">{`
import { Heading } from "../components/Heading";

function App () {
  return (
    <>
      <Heading>Hello World!</Heading> {/* Will be \`orange\` */}
      <Body>Lorem ipsum</Body> {/* Will be \`red\` */}
    </>
  );
}
      `}</CodeBlock>
    </YBox>
  );
}
