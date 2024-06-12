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
import { Alert, AlertDescription, AlertIcon, YBox } from '@crossed/ui';
import { useSignals } from '@preact/signals-react/runtime';

export default function CreateBadge() {
  useSignals();
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
              href="/ui/XBox"
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
              href="/ui/Text"
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
              href="/ui/Text"
            />
          ),
          props: [],
        },
      ]}
      return={[]}
      types={[]}
      anatomy={`// coming soon`}
      example={`<YBox space="xs">
  <Alert status="info"> 
    <AlertIcon />
    <Alert.Description>
      Lorem ipsum dolor sit amet
    </Alert.Description>
    <Alert.Action>
      <Alert.Action.Text>
        Lorem ipsum
      </Alert.Action.Text>
    </Alert.Action>
  </Alert>
  <Alert status="error"> 
    <AlertIcon />
    <Alert.Description>
      Lorem ipsum dolor sit amet
    </Alert.Description>
    <Alert.Action>
      <Alert.Action.Text>
        Lorem ipsum
      </Alert.Action.Text>
    </Alert.Action>
  </Alert>
  <Alert status="success"> 
    <AlertIcon />
    <Alert.Description>
      Lorem ipsum dolor sit amet
    </Alert.Description>
    <Alert.Action>
      <Alert.Action.Text>
        Lorem ipsum
      </Alert.Action.Text>
    </Alert.Action>
  </Alert>
  <Alert status="warning"> 
    <AlertIcon />
    <Alert.Description>
      Lorem ipsum dolor sit amet
    </Alert.Description>
    <Alert.Action>
      <Alert.Action.Text>
        Lorem ipsum
      </Alert.Action.Text>
    </Alert.Action>
  </Alert>
</YBox>`}
      scope={{ Alert, AlertDescription, AlertIcon, YBox }}
    />
  );
}
