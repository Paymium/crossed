/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../../templatePrimitive';
import { YBox, Button } from '@crossed/ui';
import { TemplateDescriptionProps } from '../../TemplateDescriptionProps';

export default function CreateBadge() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="YBox"
      description={t('ybox description')}
      params={[
        {
          title: 'Props',
          description: (
            <TemplateDescriptionProps
              componentName="XBox"
              componentExtended="Box"
              href="/Box"
            />
          ),
          props: [],
        },
      ]}
      return={[]}
      types={[]}
      anatomy={`
import { YBox } from "@crossed/ui"
      
const MyComponent = () => {
  return (<YBox>Insert element here</YBox>)
}`}
      example={`
<YBox space="md">
  <Button size='md'/>
  <Button size='md'/>
  <Button size='md'/>
</YBox>`}
      scope={{ YBox, Button }}
    />
  );
}
