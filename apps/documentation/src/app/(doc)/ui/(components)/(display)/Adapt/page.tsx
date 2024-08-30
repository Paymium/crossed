/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../../templatePrimitive';
import { Adapt, Text } from '@crossed/ui';

export default function CreateBadge() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="Adapt"
      description={t('// coming soon')}
      params={[]}
      return={[]}
      types={[]}
      anatomy={`// coming soon`}
      example={`<Adapt fallback={<Text>sm</Text>}><Text>md</Text></Adapt>`}
      scope={{ Adapt, Text }}
    />
  );
}
