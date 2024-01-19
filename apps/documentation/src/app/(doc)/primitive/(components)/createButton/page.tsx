/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../templatePrimitive';

export default function CreateButton() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="createButton"
      description={t('Creation primitive button')}
      params={[]}
      return={[]}
      types={[]}
      anatomy={`
import { createButton } from "@crossed/primitive";

const Button = createButton({
  Root,
  Group,
  Text,
  Element,
})`}
      example={`
import { createButton } from "@crossed/primitive";

const Button = createButton({
  Root,
  Group,
  Text,
  Element,
})`}
    />
  );
}
