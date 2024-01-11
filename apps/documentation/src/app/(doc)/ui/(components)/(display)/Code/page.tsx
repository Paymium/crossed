'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../../templatePrimitive';

export default function CreateBadge() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="Code"
      description={t('Code is a component used to display inline code.')}
      params={[]}
      return={[]}
      types={[]}
      anatomy={`// coming soon`}
      example={`// coming soon`}
    />
  );
}
