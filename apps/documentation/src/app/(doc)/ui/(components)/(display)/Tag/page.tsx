/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../../templatePrimitive';
import { Tag, XBox, Text } from '@crossed/ui';

export default function CreateBadge() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="Tag"
      description={t('// coming soon')}
      params={[]}
      return={[]}
      types={[]}
      anatomy={`// coming soon`}
      example={`<XBox alignItems="center" justifyContent="between">
      <Text>Promo25</Text>
      <Tag color={"green"}>Appliqué</Tag>
      </XBox>`}
      scope={{ Tag, XBox, Text }}
    />
  );
}
