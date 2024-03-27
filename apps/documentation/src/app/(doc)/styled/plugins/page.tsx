/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { CodeBlock } from '@/components/CodeBlock';
import { createStyles, useStyles } from '@crossed/styled';
import {
  H1,
  H2,
  P,
  YBox,
  Text,
  H3,
  Table,
  THead,
  TBody,
  Tr,
  Td,
  Th,
} from '@crossed/ui';

const stylesSheet = createStyles({
  colRequired: { base: { width: 100 } },
  colName: { base: { width: 100 } },
});

export default function PluginsPage() {
  const styles = useStyles(stylesSheet);
  return (
    <YBox space="md">
      <H1>Plugins</H1>

      <P>
        @crossed/styled se base sur un systeme de plugin afin de generer au
        runtime et au buildtime le css et les className pour le web, et juste
        retourner le style pour react-native web. Cela permet une grands
        flexibilité sur la manière d'ecrire sont design systeme
      </P>
      <H2 id="migrate">Structure d'un plugin</H2>
      <CodeBlock>{`
import { Registry } from "@crossed/styled/registry";
import type { Plugins } from "@crossed/styled";

export interface MyPlugin {
  font?: {
    size?: number;
    color?: string;
  };
}

const myPlugin: Plugins<MyPlugin> = {
  test: '^font$',
  apply: ({ styles, addClassname }) => {
    const { size, color } = styles;
    addClassname({
      body: {
        [\`.font\`]: {
          fontSize: \`\${size}px\`,
          color
        }
      }
    })
  }
}
Registry.addPlugin(myPlugin)
      `}</CodeBlock>
      <H3>apply</H3>
      <Table>
        <THead>
          <Tr>
            <Th className={styles.colName.className}>
              <Text>Name</Text>
            </Th>
            <Th className={styles.colName.className}>
              <Text>type</Text>
            </Th>
            <Th>
              <Text>description</Text>
            </Th>
          </Tr>
        </THead>
        <TBody>
          <Tr>
            <Td>
              <Text>key</Text>
            </Td>
            <Td>
              <Text color="info">string</Text>
            </Td>
            <Td>
              <Text>Key detected</Text>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <Text>styles</Text>
            </Td>
            <Td>
              <Text color="info">any</Text>
            </Td>
            <Td>
              <Text>style correspond of test key</Text>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <Text>isWeb</Text>
            </Td>
            <Td>
              <Text color="info">boolean</Text>
            </Td>
            <Td>
              <Text>isWeb is true when plugin loaded by @crossed/loader</Text>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <Text>props</Text>
            </Td>
            <Td>
              <Text color="info">any | undefined</Text>
            </Td>
            <Td>
              <Text>props of component, undefined at buildtime if pass</Text>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <Text>addClassname</Text>
            </Td>
            <Td>
              <Text color="info">Function</Text>
            </Td>
            <Td>
              <Text>Callback function for add className and style object</Text>
            </Td>
          </Tr>
        </TBody>
      </Table>

      <H3>addClassname</H3>
      <CodeBlock>{`
addClassname(params: {
  suffix?: string;
  prefix?: string;
  wrapper?: (str: string) => string
  body: Record<string, CrossedstyleValues>;
})
      `}</CodeBlock>
      <Table>
        <THead>
          <Tr>
            <Th className={styles.colName.className}>
              <Text>Name</Text>
            </Th>
            <Th className={styles.colRequired.className}>
              <Text>Required</Text>
            </Th>
            <Th>
              <Text>Description</Text>
            </Th>
          </Tr>
        </THead>
        <TBody>
          <Tr>
            <Td>
              <Text>body</Text>
            </Td>
            <Td>
              <Text>true</Text>
            </Td>
            <Td>
              <Text>Description</Text>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <Text>suffix</Text>
            </Td>
            <Td />
            <Td>
              <Text>Permet de rajouter un suffix a la class</Text>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <Text>prefix</Text>
            </Td>
            <Td />
            <Td>
              <Text>Permet de rajouter un prefix a la class</Text>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <Text>wrapper</Text>
            </Td>
            <Td />
            <Td>
              <Text>
                Permet d'entourer le css par une nouvelle instruction, par
                exemple l'instruction media
              </Text>
            </Td>
          </Tr>
        </TBody>
      </Table>
      {/* <P></P>
      <H6>
        Without <Kbd size="lg">@crossed/styled</Kbd>
      </H6>
      <br />
      <Tabs defaultValue="StyleSheet.create" space="md">
        <TabList>
          <Tab value="StyleSheet.create">
            <TabText>StyleSheet.create</TabText>
          </Tab>
          <Tab value="react-native-unistyles">
            <TabText>react-native-unistyles</TabText>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="StyleSheet.create">
            <CodeBlock>
              {`import { StyleSheet } from "react-native";

const styleSheet = StyleSheet.create({
  base: { color: "red" }
});

function App() {
  return <Text style={styleSheet.base}>Hello</Text>;
}`}
            </CodeBlock>
          </TabPanel>
          <TabPanel value="react-native-unistyles">
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
          </TabPanel>
        </TabPanels>
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
  ":hover":{
    color: "green"
  },
  ":active":{
    color: "blue"
  },
  ":focus":{
    color: "violet"
  },
});
      `}</CodeBlock> */}
    </YBox>
  );
}
