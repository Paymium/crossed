/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../../templatePrimitive';
import { Select, Text } from '@crossed/ui';
import { TemplateDescriptionProps } from '../../TemplateDescriptionProps';
import { useSignals } from '@preact/signals-react/runtime';
import { useSignal } from '@preact/signals-react';
import { colorsLight } from '@crossed/ui/src/theme/colors';
import type { Entries } from '@crossed/ui';
import { fontSize } from '@crossed/ui/src/theme/theme';

export default function CreateBadge() {
  useSignals();
  const { t } = useTranslation();
  const colors = useSignal('default');
  const size = useSignal('default');
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
      example={`
<Text
  color="${colors.value}"
  size="${size}"
  weight="${weight}"
  textAlign="${textAlign}"
>
  I'm a Text
</Text>
`}
      variants={
        <>
          <Select
            value={colors.value}
            onChange={(e: string) => {
              colors.value = e;
            }}
          >
            <Select.Trigger>
              <Select.Value />
            </Select.Trigger>
            <Select.Content>
              {(Object.entries(colorsLight) as Entries<typeof colorsLight>).map(
                ([key]) => {
                  if (
                    key !== 'background' &&
                    key !== 'backgroundSoft' &&
                    key !== 'backgroundStrong'
                  ) {
                    return (
                      <Select.Option value={key} key={key}>
                        <Text>{key}</Text>
                      </Select.Option>
                    );
                  }
                  return null;
                }
              )}
            </Select.Content>
          </Select>
          <Select
            value={size.value}
            onChange={(e: string) => {
              size.value = e;
            }}
          >
            <Select.Trigger>
              <Select.Value />
            </Select.Trigger>
            <Select.Content>
              {(Object.entries(fontSize) as Entries<typeof fontSize>).map(
                ([key]) => (
                  <Select.Option value={key} key={key}>
                    <Text>{key}</Text>
                  </Select.Option>
                )
              )}
            </Select.Content>
          </Select>
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
        </>
      }
      scope={{ Text }}
    />
  );
}
