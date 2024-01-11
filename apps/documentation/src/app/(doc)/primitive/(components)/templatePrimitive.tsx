'use client';

import '@/types/unistyles';
import { CodeBlock } from '@/components/CodeBlock';
import { H1, H2, I, P, Text, YBox, textAlign } from '@crossed/ui';
import { useTranslation } from 'react-i18next';
import {
  Children,
  HTMLProps,
  ReactNode,
  cloneElement,
  isValidElement,
  useMemo,
} from 'react';
import { withDefaultProps } from '@crossed/core';
import { TOCLayout } from '@/components/TOCLayout';
import { styled, unifyStyle } from '@crossed/styled';

const Table = styled(
  (props: HTMLProps<HTMLTableElement>) => (
    <table {...props} style={props.style[0]} />
  ),
  (t) => ({
    width: '100%',
    borderCollapse: 'collapse',
    borderWidth: 0,
    tableLayout: 'fixed',
  })
);

const THead = styled(
  ({ children, ...props }: HTMLProps<HTMLTableSectionElement>) => {
    const newChildren = useMemo(
      () =>
        Children.map(children, (c) => {
          if (isValidElement(c) && (c.type as any).id === 'Table.Tr') {
            return cloneElement(c, {
              ...c.props,
              style: { borderTopWidth: 0 },
            });
          }
          return c;
        }),
      [children]
    );
    return (
      <thead {...props} style={unifyStyle(props.style)}>
        {newChildren}
      </thead>
    );
  },
  (t) => ({
    borderWidth: 0,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: t.colors.borderColor,
    backgroundColor: t.utils.hexToRgbA(
      t.utils.shadeColor(t.colors.neutral, 5),
      0.5
    ),
  })
);
const TBody = styled(
  ({ children, ...props }: HTMLProps<HTMLTableSectionElement>) => {
    const newChild =
      Array.isArray(children) && children.length > 0 ? (
        children
      ) : (
        <Tr>
          <Td>
            <Text color="warning" >-</Text>
          </Td>
          <Td>
            <Text color="warning" >-</Text>
          </Td>
          <Td>
            <Text textAlign="center" color="warning" >-</Text>
          </Td>
        </Tr>
      );
    return (
      <tbody {...props} style={unifyStyle(props.style)}>
        {newChild}
      </tbody>
    );
  },
  {}
);
const Tr = styled(
  (props: HTMLProps<HTMLTableRowElement>) => (
    <tr {...props} style={unifyStyle(props.style)} />
  ),
  (t) => ({
    borderWidth: 0,
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: t.colors.borderColor,
  })
);

(Tr as any).id = 'Table.Tr';

const Td = styled(
  (props: HTMLProps<HTMLTableCellElement>) => (
    <td {...props} style={props.style[0]} />
  ),
  (t) => ({
    padding: t.space.sm,
    variants: {
      textAlign: {...textAlign},
    },
  })
);
const Th = styled(
  (props: HTMLProps<HTMLTableCellElement>) => (
    <th {...props} style={props.style[0]} />
  ),
  (t) => ({ textAlign: 'left', padding: t.space.sm })
);

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
