/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../templatePrimitive';

export default function CreateLabel() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="createLabel"
      description={t('Creation primitive Label')}
      params={[]}
      return={[]}
      types={[]}
      anatomy={`
import { createLabel } from "@crossed/primitive";

const Label = createLabel({
  Root,
  Text,
})

<Label>
  <Label.Text />
  <Label.Input />
</Label>`}
      example={`
import { createLabel } from "@crossed/primitive";

const Input = createLabel({
  Root,
  Text,
});

`}
    />
  );
}
