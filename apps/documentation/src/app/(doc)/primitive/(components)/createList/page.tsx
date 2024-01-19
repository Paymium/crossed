/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../templatePrimitive';

export default function CreateList() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="createList"
      description={t('Creation primitive List')}
      params={[]}
      return={[]}
      types={[]}
      anatomy={`
import { createList } from "@crossed/primitive";

const List = createList({
  Root,
  Item,
  Title,
  SubTitle,
  Label,
  Divider,
});

<List>
  <List.Label />
  <List.Item>
    <List.Title />
    <List.SubTitle />
  </List.Item>
  <List.Divider />
</List>`}
      example={`
import { createList } from "@crossed/primitive";

const List = createList({
  Root,
  Item,
  Title,
  SubTitle,
  Label,
  Divider,
});

`}
    />
  );
}
