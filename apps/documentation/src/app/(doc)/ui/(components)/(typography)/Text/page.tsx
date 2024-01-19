/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../../templatePrimitive';
import { Text } from '@crossed/ui';
import { TemplateDescriptionProps } from '../../TemplateDescriptionProps';

export default function CreateBadge() {
  const { t } = useTranslation();
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
              componentExtended="Text"
              href="/Text"
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
      example={`<Text weight="bold" size="lg" color="info">I'm a Text</Text>`}
      scope={{ Text }}
    />
  );
}
