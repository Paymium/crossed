/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../../templatePrimitive';
import { TemplateDescriptionProps } from '../../TemplateDescriptionProps';
import { Alert, AlertDescription, AlertTitle } from '@crossed/ui';

export default function CreateBadge() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="Alert"
      description={t('alert description')}
      params={[
        {
          title: 'Props Alert',
          description: (
            <TemplateDescriptionProps
              componentName="Alert"
              componentExtended="XBox"
              href="/XBox"
            />
          ),
          props: [
            {
              name: 'status',
              description: t('status props description'),
              type: 'error, success, warning, info',
            },
          ],
        },
        {
          title: 'Props AlertTitle',
          description: (
            <TemplateDescriptionProps
              componentName="AlertTitle"
              componentExtended="Text"
              href="/Text"
            />
          ),
          props: [],
        },
        {
          title: 'Props AlertDescription',
          description: (
            <TemplateDescriptionProps
              componentName="AlertDescription"
              componentExtended="Text"
              href="/Text"
            />
          ),
          props: [],
        },
      ]}
      return={[]}
      types={[]}
      anatomy={`// coming soon`}
      example={`
<Alert status="error"> 
  <Alert.Title>Error</Alert.Title>
  <Alert.Description>Status code 404</Alert.Description>
</Alert>`}
      scope={{ Alert, AlertDescription, AlertTitle }}
    />
  );
}
