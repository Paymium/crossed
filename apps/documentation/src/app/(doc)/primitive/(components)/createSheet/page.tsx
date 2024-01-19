/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../templatePrimitive';

export default function CreateSheet() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="createSheet"
      description={t('Creation primitive Sheet')}
      params={[]}
      return={[]}
      types={[]}
      anatomy={`
import { createSheet } from "@crossed/primitive";

// API draft`}
      example={`// API draft`}
    />
  );
}
