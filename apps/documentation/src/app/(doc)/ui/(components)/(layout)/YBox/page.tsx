'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../../templatePrimitive';

export default function CreateBadge() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="YBox"
      description={t('Used to Box elements in the vertical direction')}
      params={[]}
      return={[]}
      types={[]}
      anatomy={`// coming soon`}
      example={`// coming soon`}
    />
  );
}
