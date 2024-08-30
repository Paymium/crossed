/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { CodeBlock } from '@/components/CodeBlock';
import {
  Alert,
  Anchor,
  H1,
  H2,
  I,
  TBody,
  THead,
  Table,
  Td,
  Text,
  Th,
  Tr,
  YBox,
  fontColorStyles,
} from '@crossed/ui';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
export default function ReferenceStyled() {
  const { t } = useTranslation();
  return (
    <YBox>
      <H1>createStyles</H1>
      <H2 id="example">{t('Example')}</H2>
      <CodeBlock>{`
import { createStyles, type ExtractForProps } from '@crossed/styled';
import { Text } from "react-native";

export const styles = createStyles(() => ({
  body: {
    base: { color: "red" },
    variants: {
      color: {
        blue: {},
        red: {},
      }
    }
  }
}));

export type StylesParams = ExtractForProps<typeof styles.body>;
/**
 *  StylesParams => {
 *    active?: boolean;
 *    focus?: boolean;
 *    hover?: boolean;
 *    variants?: {
 *      color?: 'blue' | 'red'
 *    }
 *  }
 * /
`}</CodeBlock>

      <H2 id="params">Params</H2>
      <CodeBlock>createStyles(styles)</CodeBlock>
      <br />
      <Table>
        <THead>
          <Tr>
            <Th>
              <Text>{t('Name')}</Text>
            </Th>
            <Th>
              <Text>{t('Type')}</Text>
            </Th>
            <Th>
              <Text>{t('Description')}</Text>
            </Th>
          </Tr>
        </THead>
        <TBody>
          <Tr>
            <Td>
              <Text>styles</Text>
            </Td>
            <Td>
              <I style={fontColorStyles.warning}>
                {`(theme: Themes[keyof Themes]) =>
  Record<string, StyleSheet>`}
              </I>
            </Td>
            <Td>
              <Text>Create here your styles</Text>
            </Td>
          </Tr>
        </TBody>
      </Table>
      <H2 id="return">Return</H2>
      <CodeBlock>{`
const styles = createStyles(()=>({
  root: {},
  text: {},
}))

const { root, text } = styles;

root.style()
root.rnw()
root.className()

text.style()
text.rnw()
text.className()
      `}</CodeBlock>
      <br />
      <Table>
        <THead>
          <Tr>
            <Th>
              <Text>{t('Name')}</Text>
            </Th>
            <Th>
              <Text>{t('Type')}</Text>
            </Th>
            <Th>
              <Text>{t('Description')}</Text>
            </Th>
          </Tr>
        </THead>
        <TBody>
          <Tr>
            <Td>
              <Text>style</Text>
            </Td>
            <Td>
              <I style={fontColorStyles.warning}>
                {`(e: Params) => {
  style:
    | CSSProperties
    | ViewStyle
    | TextStyle
    | ImageStyle
}`}
              </I>
            </Td>
            <Td>
              <Text>Get object style for web and native</Text>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <Text>rnw</Text>
            </Td>
            <Td>
              <I style={fontColorStyles.warning}>
                {`(e: Params) => {
  style:
    | ViewStyle
    | TextStyle
    | ImageStyle
    | { $$css: true, [key: string]: string }
}
  `}
              </I>
            </Td>
            <Td>
              <Text>
                get style for web and native, for web return className, for
                native return object style
              </Text>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <Text>className</Text>
            </Td>
            <Td>
              <I style={fontColorStyles.warning}>
                {'(e: Params) => { className: string }'}
              </I>
            </Td>
            <Td>
              <Text>get className for web</Text>
            </Td>
          </Tr>
        </TBody>
      </Table>
      <Alert status="warning">
        <Alert.Description>
          Params depends of your Registry plugins configuration, see{' '}
          <Link legacyBehavior href="/styled/plugins">
            <Anchor>plugins section</Anchor>
          </Link>{' '}
          for more information
        </Alert.Description>
      </Alert>
    </YBox>
  );
}
