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
      title="Button"
      description={t('button description')}
      params={[
        {
          title: 'Props Button',
          description: (
            <TemplateDescriptionProps
              composantName="Button"
              composantExtended="View"
              link="https://reactnative.dev/docs/view"
              blank={true}
            />
          ),
          props: [
            {
              name: 'size',
              description: t('size props description'),
              type: 'xs, sm, default, lg, xl',
            },
            {
              name: 'variant',
              description: t('variant props description'),
              type: 'default, ghost, outlined ',
            },
          ],
        },
        {
          title: 'Props Button',
          description: (
            <TemplateDescriptionProps
              composantName="Button.Text"
              composantExtended="Text"
              link="/Text"
            />
          ),
          props: [],
        },
        {
          title: 'Props Button',
          description: (
            <TemplateDescriptionProps
              composantName="Button.Element"
              composantExtended="View"
              link="https://reactnative.dev/docs/view"
              blank={true}
            />
          ),
          props: [],
        },
      ]}
      return={[]}
      types={[]}
      anatomy={`
import { Button } from '@crossed/ui'

//Most simple utilisation:
<Button>Try Me</Button>

//More flexible utilisation
<Button>
  <Button.Text>Insert your button Text</Button.Text>
  <Button.Element>Insert your icon/SVG</Button.Element>
</Button>`}
      example={`
<Button>
  <Button.Text color="info" weight="bold">Try Me</Button.Text>
  <Button.Element>
    <svg width="19.2" height="19.2" viewBox="0 0 400 400" fill="red">
      <path d="M 100 100 L 300 100 L 200 300 z" fill="#93C5FD"></path>
    </svg>
  </Button.Element>
</Button>`}
      scope={{ XBox, Button }}
    />
  );
}
