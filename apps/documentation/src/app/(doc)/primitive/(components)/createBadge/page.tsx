'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../templatePrimitive';

export default function CreateBadge() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="createBadge"
      description={t('creation primitive badge')}
      params={[
        {
          name: 'Root',
          description: 'Container of Badge component',
          type: '(p: any) => ReactNode',
        },
        {
          name: 'Text',
          description: 'Text to show',
          type: '(p: any) => ReactNode',
        },
      ]}
      return={[
        { name: 'Badge', description: 'Container of Badge component' },
        { name: 'Badge.Text', description: 'Text to show' },
      ]}
      types={[]}
      anatomy={`
import { createBadge } from "@crossed/primitive";

const Badge = createBadge({ Root, Text })

<Badge>
  <Badge.Text />
</Badge>
`}
      example={`
import { createBadge } from "@crossed/primitive";

const Badge = createBadge({ Root, Text })`}
    />
  );
}
