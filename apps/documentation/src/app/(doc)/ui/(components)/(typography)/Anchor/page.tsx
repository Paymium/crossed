/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../../templatePrimitive';
import { Anchor } from '@crossed/ui';
import { TemplateDescriptionProps } from '../../TemplateDescriptionProps';

export default function CreateBadge() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="Anchor"
      description={t('anchor description')}
      params={[
        {
          title: 'Props',
          description: (
            <TemplateDescriptionProps
              componentName="Anchor"
              componentExtended="Text"
              href="/Text"
            />
          ),
          props: [],
        },
      ]}
      return={[]}
      types={[]}
      anatomy={`
import { Anchor } from "@crossed/ui"
      
const MyComponent = () => {
  return (<Anchor>Write your text here</Anchor>)
}`}
      example={`<Anchor>I'm a Link</Anchor>`}
      scope={{ Anchor }}
    />
  );
}
