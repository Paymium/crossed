/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../../templatePrimitive';
import { Card } from '@crossed/ui';
import { TemplateDescriptionProps } from '../../TemplateDescriptionProps';

export default function CreateBadge() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="Card"
      description={t('card description')}
      params={[
        {
          title: 'Card Props',
          description: (
            <TemplateDescriptionProps
              componentName="Card"
              componentExtended="YBox"
              href="/ui/YBox"
            />
          ),
          props: [],
        },
        {
          title: 'Card.Title Props',
          description: (
            <TemplateDescriptionProps
              componentName="Card.Title"
              componentExtended="Text"
              href="/ui/Text"
            />
          ),
          props: [],
        },
        {
          title: 'Card.Description Props',
          description: (
            <TemplateDescriptionProps
              componentName="Card.Description"
              componentExtended="Text"
              href="/ui/Text"
            />
          ),
          props: [],
        },
      ]}
      return={[]}
      types={[]}
      anatomy={`
import { Card } from "@crossed/ui"

//You can use card and choose which element you want in it 
<Card>
  <MyComponent/>
  <Button />
  ...
</Card>

//Or you can use Title and description
<Card>
  <Card.Title>This is the card's Title</Card.Title>
  <Card.Description>This is the card's Description</Card.Description>
<Card>`}
      example={`
<Card>
  <Card.Title>I'm the card's title</Card.Title>
  <Card.Description>I'm the card's description</Card.Description>
</Card>`}
      scope={{ Card }}
    />
  );
}
