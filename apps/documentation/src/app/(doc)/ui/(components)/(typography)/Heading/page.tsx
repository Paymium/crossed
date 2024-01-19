/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../../templatePrimitive';
import { H1, H2, H3, H4, H5, H6 } from '@crossed/ui';
import { TemplateDescriptionProps } from '../../TemplateDescriptionProps';

export default function CreateBadge() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="Heading"
      description={t('heading description')}
      params={[
        {
          title: 'Props',
          description: (
            <TemplateDescriptionProps
              componentName="H1, H2, H3, H4, H5, H6"
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
import { H1, H2, H3, H4, H5, H6 } from "@crossed/ui"
      
const MyComponent = () => {
  return (
    <H1>This is Heading 1</H1>
    <H2>This is Heading 2</H2>
    <H3>This is Heading 3</H3>
    <H4>This is Heading 4</H4>
    <H5>This is Heading 5</H5>
    <H6>This is Heading 6</H6>
  )
}`}
      example={`
<>
  <H1>This is Heading 1</H1>
  <H2>This is Heading 2</H2>
  <H3>This is Heading 3</H3>
  <H4>This is Heading 4</H4>
  <H5>This is Heading 5</H5>
  <H6>This is Heading 6</H6>
</>

`}
      scope={{ H1, H2, H3, H4, H5, H6 }}
    />
  );
}
