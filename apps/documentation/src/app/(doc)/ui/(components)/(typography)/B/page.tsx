/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../../templatePrimitive';
import { B } from '@crossed/ui';
import { TemplateDescriptionProps } from '../../TemplateDescriptionProps';

export default function CreateBadge() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="B"
      description={t('B description')}
      params={[
        {
          title: 'Props',
          description: (
            <TemplateDescriptionProps
              composantName="B"
              composantExtended="Text"
              link="/Text"
            />
          ),
          props: [],
        },
      ]}
      return={[]}
      types={[]}
      anatomy={`
import { B } from "@crossed/ui"
      
const MyComponent = () => {
  return (<B>Write your text here</B>)
}`}
      example={`<B>This is a way to put emphasis on a text </B>`}
      scope={{ B }}
    />
  );
}
