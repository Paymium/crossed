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
              composantName="Text"
              composantExtended="Text"
              link="/Text"
            />
          ),
          props: [
            {
              name: 'weight',
              description:
                "Apply choosen font's weight. Default value is a weight of 400.",
              type: 'thin, extralight, light, medium, semibold, bold, extrabold, black',
            },
            {
              name: 'size',
              description: "Apply choosen font's size. Default value is 20.",
              type: 'xxs, xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl',
            },
            {
              name: 'color',
              description:
                "Apply choosen font's color. Default color depend on the theme : black for light theme and white for dark theme.",
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
