/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../templatePrimitive';

export default function CreateInput() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="createInput"
      description={t('Creation primitive Input')}
      params={[]}
      return={[]}
      types={[]}
      anatomy={`
import { createInput } from "@crossed/primitive";

const Input = createInput({
  Group,
  Addon,
  Element,
  Input,
})`}
      example={`
import { createInput } from "@crossed/primitive";

const Input = createInput({
  Group,
  Addon,
  Element,
  Input,
})`}
    />
  );
}
