/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { CodeBlock } from '@/components/CodeBlock';
import { H1, H2, H6, Kbd, P, Tabs, YBox } from '@crossed/ui';

export default function UsagePage() {
  return (
    <YBox>
      <H1>Concept</H1>

      <P>
        @crossed/styled allows you to generate components that encapsulate their
        own styles, while also enabling their reuse or extension to create a new
        component. All of this is achieved by writing less code.
      </P>
      <P>
        When you use <Kbd>createStyleSheet</Kbd> from{' '}
        <Kbd>react-native-unistyles</Kbd> or <Kbd>StyleSheet.create</Kbd> from{' '}
        <Kbd>react-native</Kbd> you need to create styleSheet with differents
        keys.
      </P>
      <H2 id="migrate">Migrate to @crossed/styled</H2>
      <H6>
        Without <Kbd size="lg">@crossed/styled</Kbd>
      </H6>
      <br />
      <Tabs defaultValue="StyleSheet.create" space="md">
        <Tabs.List>
          <Tabs.Tab value="StyleSheet.create">
            <Tabs.Tab.Text>StyleSheet.create</Tabs.Tab.Text>
          </Tabs.Tab>
          <Tabs.Tab value="react-native-unistyles">
            <Tabs.Tab.Text>react-native-unistyles</Tabs.Tab.Text>
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel value="StyleSheet.create">
            <CodeBlock>
              {`import { StyleSheet } from "react-native";

const styleSheet = StyleSheet.create({
  base: { color: "red" }
});

function App() {
  return <Text style={styleSheet.base}>Hello</Text>;
}`}
            </CodeBlock>
          </Tabs.Panel>
          <Tabs.Panel value="react-native-unistyles">
            <CodeBlock>
              {`import { createStyleSheet, useStyles } from "react-native-unistyles";

const styleSheet = createStyleSheet({
  base: { color: "red" }
});

function App() {
  const { styles } = useStyles(styleSheet);
  return <Text style={styles.base}>Hello</Text>;
}`}
            </CodeBlock>
          </Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
      <br />
      <H6>
        With <Kbd size="lg">@crossed/styled</Kbd>
      </H6>
      <P>You can write it with less code</P>
      <CodeBlock>{`
import { styled } from "@crossed/styled";

const styleSheet = styled({ color: "red" });
      `}</CodeBlock>

      <H2 id="interaction">User interaction</H2>
      <P>
        The styled function allows for interactive styling based on the state
        associated with pointer events, such as finger or mouse interactions.
      </P>
      <CodeBlock>{`
import { styled } from "@crossed/styled";

const styleSheet = styled({
  color: "red",
  "hover:":{
    color: "green"
  },
  "active:":{
    color: "blue"
  },
  "focus:":{
    color: "violet"
  },
});
      `}</CodeBlock>
    </YBox>
  );
}
