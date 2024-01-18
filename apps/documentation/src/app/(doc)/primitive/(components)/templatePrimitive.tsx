'use client';

import '@/types/unistyles';
import { CodeBlock } from '@/components/CodeBlock';
import {
  H1,
  H2,
  I,
  P,
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
import { ReactNode } from 'react';
import { withDefaultProps } from '@crossed/core';
import { TOCLayout } from '@/components/TOCLayout';

type TableRow = { name: string; description: string; type?: string };

type TemplatePrimitiveProps = {
  title: ReactNode;
  description?: ReactNode;
  anatomy: string;
  params: TableRow[];
  return: TableRow[];
  types: TableRow[];
  example: string;
};

export const TemplatePrimitive = ({
  title,
  description,
  anatomy,
  params,
  return: returnProps,
  example,
  types,
}: TemplatePrimitiveProps) => {
  const { t } = useTranslation();
  return (
    <YBox>
      <H1>{title}</H1>
      {description && <P size="lg">{description}</P>}
      {example && (
        <>
          <H2 id="example">{t('Example')}</H2>
          <CodeBlock language="tsx">{example}</CodeBlock>
        </>
      )}
      {anatomy && (
        <>
          <H2 id="anatomy">{t('Anatomy')}</H2>
          <CodeBlock language="tsx">{anatomy}</CodeBlock>
        </>
      )}
      <H2 id="params">Params</H2>
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
          {params.map(({ name, description, type }, i) => {
            return (
              <Tr key={`returnProps-${i}`}>
                <Td>
                  <Text>{name}</Text>
                </Td>
                <Td>
                  <I color="warning">{type || '-'}</I>
                </Td>
                <Td>
                  <Text>{description}</Text>
                </Td>
              </Tr>
            );
          })}
        </TBody>
      </Table>
      <H2 id="return">Return</H2>
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
          {returnProps.map(({ name, description, type }, i) => {
            return (
              <Tr key={`returnProps-${i}`}>
                <Td>
                  <Text>{name}</Text>
                </Td>
                <Td>
                  <Text color="warning">{type || '-'}</Text>
                </Td>
                <Td>
                  <Text>{description}</Text>
                </Td>
              </Tr>
            );
          })}
        </TBody>
      </Table>
      <H2 id="types">Types</H2>
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
          {types.map(({ name, description, type }, i) => {
            return (
              <Tr key={`returnProps-${i}`}>
                <Td>
                  <Text>{name}</Text>
                </Td>
                <Td>
                  <Text color="warning">{type || '-'}</Text>
                </Td>
                <Td>
                  <Text>{description}</Text>
                </Td>
              </Tr>
            );
          })}
        </TBody>
      </Table>
    </YBox>
  );
};

export const Menu = withDefaultProps(TOCLayout, {
  links: [
    { title: 'Anatomy', href: '#anatomy' },
    { title: 'Params', href: '#params' },
    { title: 'Return', href: '#return' },
    { title: 'Example', href: '#example' },
  ],
});
