/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../../templatePrimitive';
import { XBox, Button } from '@crossed/ui';
import { TemplateDescriptionProps } from '../../TemplateDescriptionProps';

export default function CreateBadge() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="XBox"
      description={t('xbox description')}
      params={[
        {
          title: 'Props',
          description: (
            <TemplateDescriptionProps
              composantName="XBox"
              composantExtended="Box"
              link="/Box"
            />
          ),
          props: [],
        },
      ]}
      return={[]}
      types={[]}
      anatomy={`
import { XBox } from "@crossed/ui"
      
const MyComponent = () => {
  return (<XBox>Insert element here</XBox>)
}`}
      example={`
<XBox space='md'>
  <Button size='md'/>
  <Button size='md'/>
  <Button size='md'/>
</XBox>`}
      scope={{ XBox, Button }}
    />
  );
}
