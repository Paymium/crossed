/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../../templatePrimitive';
import { Select, Text, YBox } from '@crossed/ui';
import { TemplateDescriptionProps } from '../../TemplateDescriptionProps';
import { useSignals } from '@preact/signals-react/runtime';
import { useSignal } from '@preact/signals-react';
// import { colorsLight } from '@crossed/ui/src/theme/colors';
// import type { Entries } from '@crossed/ui';
// import { fontSize } from '@crossed/ui/src/theme/theme';

export default function CreateBadge() {
  useSignals();
  const { t } = useTranslation();
  const weight = useSignal('default');
  const textAlign = useSignal('center');
  return (
    <TemplatePrimitive
      title="Text"
      description={t('text description')}
      params={[
        {
          title: 'Props',
          description: (
            <TemplateDescriptionProps
              componentName="Text"
              componentExtended="react-native Text"
              target="_blank"
              href="https://reactnative.dev/docs/text"
            />
          ),
          props: [
            {
              name: 'weight',
              description: t('weight props description'),
              type: 'thin, extralight, light, medium, semibold, bold, extrabold, black',
            },
            {
              name: 'size',
              description: t('font size props description'),
              type: 'xxs, xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl',
            },
            {
              name: 'color',
              description: t('color props description'),
              type: 'error, info, warning, success',
            },
          ],
        },
      ]}
      return={[]}
      types={[]}
      anatomy={`
import { Text } from "@crossed/ui"
      
const MyComponent = () => {
  return (<Text>Write your text here</Text>)
}`}
      example={`<YBox>
      <Text size="h1">I'm a Text size h1</Text>
      <Text size="h2">I'm a Text size h2</Text>
      <Text size="h3">I'm a Text size h3</Text>
      <Text size="h4">I'm a Text size h4</Text>
      <Text size="h5">I'm a Text size h5</Text>
      <Text size="h6">I'm a Text size h6</Text>
      <Text size="xl">I'm a Text size xl</Text>
      <Text size="lg">I'm a Text size lg</Text>
      <Text size="md">I'm a Text size md</Text>
      <Text size="sm">I'm a Text size sm</Text>
      <Text size="xs">I'm a Text size xs</Text>
</YBox>
`}
      variants={
        <YBox space="xs">
          <Select
            value={weight.value}
            onChange={(e: string) => {
              weight.value = e;
            }}
          >
            <Select.Trigger>
              <Select.Value />
            </Select.Trigger>
            <Select.Content>
              {[
                'thin',
                'extralight',
                'light',
                'default',
                'medium',
                'semibold',
                'bold',
                'extrabold',
                'black',
              ].map((key) => (
                <Select.Option value={key} key={key}>
                  <Text>{key}</Text>
                </Select.Option>
              ))}
            </Select.Content>
          </Select>
          <Select
            value={textAlign.value}
            onChange={(e: string) => {
              textAlign.value = e;
            }}
          >
            <Select.Trigger>
              <Select.Value />
            </Select.Trigger>
            <Select.Content>
              {['auto', 'center', 'justify', 'left', 'default', 'right'].map(
                (key) => (
                  <Select.Option value={key} key={key}>
                    <Text>{key}</Text>
                  </Select.Option>
                )
              )}
            </Select.Content>
          </Select>
        </YBox>
      }
      scope={{ Text, YBox }}
    />
  );
}
