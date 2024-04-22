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
import { CloseButton } from '@crossed/ui';
import { TemplateDescriptionProps } from '../../TemplateDescriptionProps';
import { useSignals } from '@preact/signals-react/runtime';

export default function CreateBadge() {
  useSignals();
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="CloseButton"
      description={t('// coming soon')}
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
import { CloseButton } from '@crossed/ui'

<CloseButton />`}
      example={`<>
  <CloseButton />
  <CloseButton disabled />
</>`}
      scope={{ CloseButton }}
      // variants={
      //   <>
      //     <Text>variant</Text>
      //     <Select
      //       value={variants}
      //       onChange={(e: string) => {
      //         setVariants(e);
      //       }}
      //     >
      //       <Select.Trigger>
      //         <XBox alignItems="center">
      //           <Select.Value />
      //         </XBox>
      //       </Select.Trigger>
      //       <Select.Content>
      //         {['primary', 'secondary', 'tertiary'].map((key) => {
      //           return (
      //             <Select.Option value={key} key={key}>
      //               <Text>{key}</Text>
      //             </Select.Option>
      //           );
      //         })}
      //       </Select.Content>
      //     </Select>
      //     <XBox>
      //       <input
      //         type="checkbox"
      //         checked={error}
      //         onChange={(e) => setError(e.target.checked)}
      //       />
      //       <Text>error</Text>
      //     </XBox>
      //   </>
      // }
    />
  );
}
