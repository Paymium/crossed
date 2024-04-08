/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import '@/style.config';
import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../../templatePrimitive';
import { Button, Select, Text, Center } from '@crossed/ui';
import { MousePointerClick } from '@crossed/unicons/MousePointerClick';
import { TemplateDescriptionProps } from '../../TemplateDescriptionProps';
import { useSignal } from '@preact/signals-react';
import { useSignals } from '@preact/signals-react/runtime';

export default function CreateBadge() {
  useSignals();
  const { t } = useTranslation();
  const variants = useSignal('default');
  const colors = useSignal('neutral');
  return (
    <TemplatePrimitive
      title="Button"
      description={t('button description')}
      params={[
        {
          title: 'Props Button',
          description: (
            <TemplateDescriptionProps
              componentName="Button"
              componentExtended="View"
              href="https://reactnative.dev/docs/view"
              target="_blank"
            />
          ),
          props: [
            {
              name: 'size',
              description: t('size props description'),
              type: 'xs, sm, default, lg, xl',
            },
            {
              name: 'variant',
              description: t('variant props description'),
              type: 'default, ghost, outlined ',
            },
          ],
        },
        {
          title: 'Props Button',
          description: (
            <TemplateDescriptionProps
              componentName="Button.Text"
              componentExtended="Text"
              href="/ui/Text"
            />
          ),
          props: [],
        },
        {
          title: 'Props Button',
          description: (
            <TemplateDescriptionProps
              componentName="Button.Element"
              componentExtended="View"
              href="https://reactnative.dev/docs/view"
              target="_blank"
            />
          ),
          props: [],
        },
      ]}
      return={[]}
      types={[]}
      anatomy={`
import { Button } from '@crossed/ui'

//Most simple utilisation:
<Button>Try Me</Button>

//More flexible utilisation
<Button>
  <Button.Text>Insert your button Text</Button.Text>
  <Button.Element>Insert your icon/SVG</Button.Element>
</Button>`}
      example={`
<Center>
  <Button variant="${variants}" color="${colors.value}">
    <Button.Element>
      <MousePointerClick />
    </Button.Element>
    <Button.Text>Try Me</Button.Text>
  </Button>
</Center>`}
      scope={{ Center, Button, MousePointerClick }}
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
              {/* {Object.keys(
                theme.utils.createVariants('backgroundColor', theme)
              ).map((key) => (
                <Select.Option value={key} key={key}>
                  <Text>{key}</Text>
                </Select.Option>
              ))} */}
            </Select.Content>
          </Select>
          <Select
            value={variants.value}
            onChange={(e: string) => {
              variants.value = e;
            }}
          >
            <Select.Trigger>
              <Select.Value />
            </Select.Trigger>
            <Select.Content>
              {['default', 'ghost', 'outlined'].map((key) => {
                return (
                  <Select.Option value={key} key={key}>
                    <Text>{key}</Text>
                  </Select.Option>
                );
              })}
            </Select.Content>
          </Select>
        </>
      }
    />
  );
}
