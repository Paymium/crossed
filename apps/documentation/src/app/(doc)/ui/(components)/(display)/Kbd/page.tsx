/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../../templatePrimitive';
import { Kbd, Text } from '@crossed/ui';
import { TemplateDescriptionProps } from '../../TemplateDescriptionProps';

export default function CreateBadge() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="Kdb"
      description={t('kbd description')}
      params={[
        {
          title: 'Props',
          description: (
            <TemplateDescriptionProps
              componentName="Kbd"
              componentExtended="Text"
              href="/ui/Text"
            />
          ),
          props: [],
        },
      ]}
      return={[]}
      types={[]}
      anatomy={`
import { Kbd } from '@crossed/ui';

<Kbd>Your text</Kbd>`}
      example={`<Text>For copy, the keyboard shortcup is <Kbd>ctrl + c</Kbd>, for paste <Kbd>ctrl + v</Kbd></Text>`}
      scope={{ Kbd, Text }}
    />
  );
}
