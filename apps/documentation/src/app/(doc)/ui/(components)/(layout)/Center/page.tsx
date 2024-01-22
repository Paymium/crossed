/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../../templatePrimitive';
import { Center, Button } from '@crossed/ui';
import { TemplateDescriptionProps } from '../../TemplateDescriptionProps';

export default function CreateBadge() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="Center"
      description={t('center description')}
      params={[
        {
          title: 'Props',
          description: (
            <TemplateDescriptionProps
              componentName="Center"
              componentExtended="YBox"
              href="/ui/YBox"
            />
          ),
          props: [],
        },
      ]}
      return={[]}
      types={[]}
      anatomy={`
import { Center } from "@crossed/ui"
      
const MyComponent = () => {
  return (<Center>Insert element here</Center>)
}`}
      example={`
<Center space='md'>
  <Button size='md'/>
  <Button size='md'/>
  <Button size='md'/>
</Center>`}
      scope={{ Center, Button }}
    />
  );
}
