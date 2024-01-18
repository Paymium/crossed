/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../../templatePrimitive';
import { Code } from '@crossed/ui';
import { TemplateDescriptionProps } from '../../TemplateDescriptionProps';

export default function CreateBadge() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="Code"
      description={t('code description')}
      params={[
        {
          title: 'Props',
          description: (
            <TemplateDescriptionProps
              composantName="Code"
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
import { Code } from '@crossed/ui'

const MyComponent = () => {
  return (<Code>Type any code here</Code>)
}`}
      example={`
      <Code>const toto = () => console.log("tata") </Code>`}
      scope={{ Code }}
    />
  );
}
