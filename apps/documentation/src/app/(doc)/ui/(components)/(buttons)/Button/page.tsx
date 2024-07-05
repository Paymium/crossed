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
import { Button, Select, Text, Center, XBox, ButtonIcon } from '@crossed/ui';
import { MousePointerClick } from '@crossed/unicons';
import { TemplateDescriptionProps } from '../../TemplateDescriptionProps';
import { useSignals } from '@preact/signals-react/runtime';
import { useState } from 'react';

export default function CreateBadge() {
  useSignals();
  const { t } = useTranslation();
  const [variants, setVariants] = useState('primary');
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  return (
    <TemplatePrimitive
      title="Button"
      description={t('button description')}
      params={[
        {
          title: 'Button',
          description: (
            <TemplateDescriptionProps
              componentName="Button"
              componentExtended="Pressable"
              href="https://reactnative.dev/docs/pressable"
              target="_blank"
            />
          ),
          props: [
            {
              name: 'variant',
              description: t('variant props description'),
              type: 'primary, secondary, tertiary ',
            },
          ],
        },
        {
          title: 'Button.Text',
          description: (
            <TemplateDescriptionProps
              componentName="Button.Text"
              componentExtended="Text"
              href="/crossed/ui/Text"
            />
          ),
          props: [],
        },
        {
          title: 'Button.Element',
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
    <Button variant="${variants}"${error ? ' error' : ''} disabled={${disabled}}>
      <ButtonIcon>
        <MousePointerClick />
      </ButtonIcon>
      <Button.Text>Try Me</Button.Text>
    </Button>
  </Center>
`}
      scope={{ Center, Button, MousePointerClick, ButtonIcon }}
      variants={
        <>
          <Text>variant</Text>
          <Select
            value={variants}
            onChange={(e: string) => {
              setVariants(e);
            }}
          >
            <Select.Trigger>
              <XBox alignItems="center">
                <Select.Value />
              </XBox>
            </Select.Trigger>
            <Select.Content>
              {['primary', 'secondary', 'tertiary'].map((key) => {
                return (
                  <Select.Option value={key} key={key}>
                    <Text>{key}</Text>
                  </Select.Option>
                );
              })}
            </Select.Content>
          </Select>
          <XBox>
            <input
              type="checkbox"
              checked={error}
              onChange={(e) => setError(e.target.checked)}
            />
            <Text>error</Text>
          </XBox>
          <XBox>
            <input
              type="checkbox"
              checked={disabled}
              onChange={(e) => setDisabled(e.target.checked)}
            />
            <Text>disabled</Text>
          </XBox>
        </>
      }
    />
  );
}
