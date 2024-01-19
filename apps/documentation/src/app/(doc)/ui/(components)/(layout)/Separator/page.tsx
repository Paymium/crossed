/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../../templatePrimitive';
import { Divider, Button, XBox, YBox } from '@crossed/ui';
import { TemplateDescriptionProps } from '../../TemplateDescriptionProps';

export default function CreateBadge() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="Separator"
      description={t('separator description')}
      params={[
        {
          title: 'Props',
          description: (
            <TemplateDescriptionProps
              componentName="Separator"
              componentExtended="View"
              href="https://reactnative.dev/docs/view"
              blank={true}
            />
          ),
          props: [
            {
              name: 'Direction',
              description: t('direction props description'),
              type: 'horizontal, vertical',
            },
          ],
        },
      ]}
      return={[]}
      types={[]}
      anatomy={`
import { Divider } from "@crossed/ui"
      
const MyComponent = () => {
  return (<Divider>Insert element here</Divider>)
}`}
      example={`
<XBox space="md">
  <YBox>
    <Button size='md'/>
    <Divider direction="horizontal"/>
    <Button size='md'/>
    <Divider direction="horizontal"/>
    <Button size='md'/>
  </Ybox>
  <XBox center='true'>
    <Button size='md'/>
    <Divider direction="vertical"/>
    <Button size='md'/>
    <Divider direction="vertical"/>
    <Button size='md'/>
  </XBox>
</XBox>`}
      scope={{ Divider, Button, XBox, YBox }}
    />
  );
}
