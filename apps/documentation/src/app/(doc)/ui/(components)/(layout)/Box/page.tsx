/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../../templatePrimitive';
import { Box, Button } from '@crossed/ui';
import { TemplateDescriptionProps } from '../../TemplateDescriptionProps';

export default function CreateBadge() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="Box"
      description={t('box description')}
      params={[
        {
          title: 'Props',
          description: (
            <TemplateDescriptionProps
              componentName="Box"
              componentExtended="View"
              href="https://reactnative.dev/docs/view"
              blank={true}
            />
          ),
          props: [
            {
              name: 'space',
              description: t('space props description'),
              type: 'xs, sm, md, lg, xl',
            },
            {
              name: 'center',
              description: t('center props description'),
              type: 'true',
            },
          ],
        },
      ]}
      return={[]}
      types={[]}
      anatomy={`
import { Box } from "@crossed/ui"
      
const MyComponent = () => {
  return (<Box>Insert element here</Box>)
}`}
      example={`
<Box space='md'>
  <Button size='md'/>
  <Button size='md'/>
  <Button size='md'/>
</Box>`}
      scope={{ Box, Button }}
    />
  );
}
