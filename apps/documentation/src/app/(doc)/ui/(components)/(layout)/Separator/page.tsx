'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../../templatePrimitive';

export default function CreateBadge() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="Separator"
      description={t('Visually or semantically separates content.')}
      params={[]}
      return={[]}
      types={[]}
      anatomy={`// coming soon`}
      example={`// coming soon`}
    />
  );
}
