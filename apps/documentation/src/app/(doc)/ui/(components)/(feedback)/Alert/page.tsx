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
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  Box,
  ButtonText,
  Select,
  Text,
} from '@crossed/ui';
import { useSignal } from '@preact/signals-react';
import { useSignals } from '@preact/signals-react/runtime';

export default function CreateBadge() {
  useSignals();
  const { t } = useTranslation();
  const status = useSignal('info');
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
      example={`<>
<Alert status="${status.value}"> 
  <Alert.Title>Sollicitudin</Alert.Title>
  <Alert.Description>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna
  </Alert.Description>
  <AlertAction>
    <ButtonText>Button</ButtonText>
  </AlertAction>
</Alert>
<br />
<Alert status="${status.value}"> 
<Alert.Title>Sollicitudin</Alert.Title>
<Alert.Description>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit
</Alert.Description>
<AlertAction>
  <ButtonText>Button</ButtonText>
</AlertAction>
</Alert>
</>`}
      scope={{ Alert, AlertDescription, AlertTitle, AlertAction, ButtonText }}
      variants={
        <Box>
          <Select
            value={status.value}
            onChange={(e: string) => {
              status.value = e;
            }}
          >
            <Select.Trigger>
              <Select.Value />
            </Select.Trigger>
            <Select.Content>
              {['error', 'success', 'warning', 'info'].map((key) => {
                return (
                  <Select.Option value={key} key={key}>
                    <Text>{key}</Text>
                  </Select.Option>
                );
              })}
            </Select.Content>
          </Select>
        </Box>
      }
    />
  );
}
