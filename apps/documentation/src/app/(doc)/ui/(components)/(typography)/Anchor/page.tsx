'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../../templatePrimitive';

export default function CreateBadge() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="Anchor"
      description={t('Link is an accessible element for navigation.')}
      params={[]}
      return={[]}
      types={[]}
      anatomy={`// coming soon`}
      example={`// coming soon`}
    />
  );
}
