/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../templatePrimitive';

export default function CreateSelect() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="createSelect"
      description={t('Creation primitive Select')}
      params={[]}
      return={[]}
      types={[]}
      anatomy={`
import { createSelect } from "@crossed/primitive";

// API draft`}
      example={`// API draft`}
    />
  );
}
