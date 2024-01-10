'use client';
import { CodeBlock } from '@/components/CodeBlock';
import '@/types/unistyles';
import { withDefaultProps } from '@crossed/core';
import { styled } from '@crossed/styled';
import { Alert, Anchor, H1, H2, P, Tabs, Text, YBox } from '@crossed/ui';

const Description = withDefaultProps(styled(Text, {}), {
  size: 'xl',
  weight: 'medium',
});
export default function Home() {
  return (
    <YBox role="main">
      <H1>Setup</H1>
      <Description>Get @crossed/styled set up, step by step</Description>
      <YBox space="md">
        <H2 id="install">Install dependencies</H2>
        <Tabs defaultValue="pnpm">
          <Tabs.List>
            <Tabs.Tab value="pnpm">
              <Tabs.Tab.Text>pnpm</Tabs.Tab.Text>
            </Tabs.Tab>
            <Tabs.Tab value="npm">
              <Tabs.Tab.Text>npm</Tabs.Tab.Text>
            </Tabs.Tab>
            <Tabs.Tab value="yarn">
              <Tabs.Tab.Text>yarn</Tabs.Tab.Text>
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="pnpm">
              <CodeBlock language="sh">
                pnpm i @crossed/styled react-native-unistyles
              </CodeBlock>
            </Tabs.Panel>
            <Tabs.Panel value="npm">
              <CodeBlock language="sh">
                npm i @crossed/styled react-native-unistyles
              </CodeBlock>
            </Tabs.Panel>
            <Tabs.Panel value="yarn">
              <CodeBlock language="sh">
                yarn add @crossed/styled react-native-unistyles
              </CodeBlock>
            </Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      </YBox>

      <H2 id="configure">Configure</H2>
      <P>
        You should finish installation and configure react-native-unistyles,
        click{' '}
        <Anchor
          href="https://reactnativeunistyles.vercel.app/start/setup/#3-configure-unistyles-with-unistylesregistry"
          hrefAttrs={{ target: '_blank' }}
        >
          here
        </Anchor>
      </P>

      <Alert status="warning">
        <YBox space="md">
          <YBox>
            <Alert.Title>Server side renderer</Alert.Title>
            <Alert.Description>
              For add style on server side rendering, you should add registry on
              server components (nextjs app router)
            </Alert.Description>
          </YBox>
          <CodeBlock language="tsx" fileName="app/layout.tsx">
            {`
import type { PropsWithChildren } from 'react';
import { Registry } from '@crossed/styled';

export default function RootLayout({
  children
}: PropsWithChildren) {
  return (
    <html lang="en">
      <Registry>
        <body>
          {children}
        </body>
      </Registry>
    </html>
  );
}
`}
          </CodeBlock>
        </YBox>
      </Alert>

      <YBox space="md">
        <H2 id="usage">Usage</H2>
        <CodeBlock language="tsx" fileName="foo.tsx">
          {`
import { styled } from '@crossed/styled';
import { Text } from "react-native";

const TextStyled = styled(Text, {
  color: "red"
});

function App () {
  return <TextStyled>Hello World!</TextStyled>;
}
`}
        </CodeBlock>
      </YBox>
    </YBox>
  );
}