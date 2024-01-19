/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../../templatePrimitive';
import { Ul, Li, Text } from '@crossed/ui';

export default function CreateBadge() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="List"
      description={t('list description')}
      params={[]}
      return={[]}
      types={[]}
      anatomy={`
import { Ul, Li } from '@crossed/ui

<Ul>
  <Li>Your item</Li>
  <Li>Your item</Li>
  ...
</Ul>`}
      example={`
<Ul>
  <Li>
    Item 1
  </Li>
  <Li>
    <Text>Item 2</Text>
  </Li>
  <Li>
    <Text>Item 3</Text>
  </Li>
  <Li>
    <Text>Item 4</Text>
  </Li>
  <Li>
    <Text>Item 5</Text>
  </Li>
</Ul>`}
      scope={{ Ul, Li, Text }}
    />
  );
}
