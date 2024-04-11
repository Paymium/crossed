/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import '@/style.config';
import { CodeBlock } from '@/components/CodeBlock';
import { createStyles } from '@crossed/styled';
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

const stylesSheet = createStyles(() => ({
  colRequired: { base: { width: 100 } },
  colName: { base: { width: 100 } },
}));

export default function PluginsPage() {
  return (
    <YBox space="md">
      <H1>Plugins</H1>

      <P>
        @crossed/styled se base sur un systeme de plugin afin de generer le
        style ou les className pour le web. Cela permet une grande flexibilité
        sur la manière d'écrire sont design system
      </P>
      <H2 id="migrate">Structure d'un plugin</H2>
      <CodeBlock>{`
import { Registry, createStyles } from "@crossed/styled";
import { normalizeUnitPixel } from "@crossed/styled/plugins";
import type { Plugins } from "@crossed/styled";

interface MyPlugin {
  font?: {
    size?: number;
    color?: string;
  };
}

const myPlugin: Plugins<MyPlugin> = {
  test: '^font$',
  apply: ({ styles, addClassname, isWeb }) => {
    const { size, color } = styles;
    addClassname({
      body: {
        [\`.font\`]: {
          fontSize: normalizeUnitPixel('fontSize', size, isWeb),
          lineHeight: normalizeUnitPixel('lineHeight', size * 1.3, isWeb),
          color
        }
      }
    })
  }
}

declare module '@crossed/styled' {
  export interface StyleSheet extends MyPlugin {}
}

Registry.addPlugin(myPlugin)

createStyles(() => ({
  font: { // <= you have autocompletion
    size: 12,
    color: "black",
  },
}));
      `}</CodeBlock>
      <H3>apply</H3>
      <Table>
        <THead>
          <Tr>
            <Th {...stylesSheet.colName.className()}>
              <Text>Name</Text>
            </Th>
            <Th {...stylesSheet.colName.className()}>
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
            <Th {...stylesSheet.colName.className()}>
              <Text>Name</Text>
            </Th>
            <Th {...stylesSheet.colRequired.className()}>
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
    </YBox>
  );
}
