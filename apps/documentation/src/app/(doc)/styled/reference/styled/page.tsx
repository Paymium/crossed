/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { CodeBlock } from '@/components/CodeBlock';
import '@/types/unistyles';
import {
  Code,
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
} from '@crossed/ui';
import { useTranslation } from 'react-i18next';
export default function ReferenceStyled() {
  const { t } = useTranslation();
  return (
    <YBox>
      <H1>styled</H1>
      <H2 id="example">{t('Example')}</H2>
      <CodeBlock language="tsx">{`
import { styled, type GetProps } from '@crossed/styled';
import { Text } from "react-native";

export const Body = styled(Text, {
  color: "red"
});

export type BodyProps = GetProps<typeof Body>;
`}</CodeBlock>

      <H2 id="params">Params</H2>
      <Code>styled(Comp, styles, options)</Code>
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
              <Text>Comp</Text>
            </Td>
            <Td>
              <I color="warning">ComponentType</I>
            </Td>
            <Td>
              <Text>Component to styled</Text>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <Text>styles</Text>
            </Td>
            <Td>
              <I color="warning">
                {'| Partial<UnistylesValuesExtends>'}
                <br />
                {
                  '| ((_theme: UnistylesTheme) => Partial<UnistylesValuesExtends>'
                }
              </I>
            </Td>
            <Td>
              <Text>see unistyles documentation</Text>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <Text>options</Text>
            </Td>
            <Td>
              <I color="warning">{'StyledOptions'}</I>
            </Td>
            <Td>
              <Text>see unistyles documentation</Text>
            </Td>
          </Tr>
        </TBody>
      </Table>
      <H2 id="return">Return</H2>
      <CodeBlock language="tsx">{`
const Button = styled(Comp, styles)
const { styleSheet } = Button;
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
              <Text>Button</Text>
            </Td>
            <Td>
              <I color="warning">ComponentType</I>
            </Td>
            <Td>
              <Text>Component to styled</Text>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <Text>styleSheet</Text>
            </Td>
            <Td>
              <I color="warning">{'(e: UnistylesTheme) => UnistylesValues'}</I>
            </Td>
            <Td>
              <Text>Function return style apply on component</Text>
            </Td>
          </Tr>
        </TBody>
      </Table>
    </YBox>
  );
}
