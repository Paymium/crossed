/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../../templatePrimitive';
import { Label, YBox } from '@crossed/ui';

export default function CreateBadge() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="Label"
      description={t('Label form elements with accessibility.')}
      params={[]}
      return={[]}
      types={[]}
      anatomy={`// coming soon`}
      example={`
<YBox space="sm">
  <Label>Simple</Label>
  <Label focus>Focused</Label>
  <Label disabled>Disabled</Label>
</YBox>
`}
      scope={{ Label, YBox }}
    />
  );
}
