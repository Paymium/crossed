'use client';
import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../templatePrimitive';

export default function CreateSelect() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="createSelect"
      description={t('Creation primitive Select')}
      params={[]}
      return={[]}
      types={[]}
      anatomy={`
import { createSelect } from "@crossed/primitive";

// API draft`}
      example={`// API draft`}
    />
  );
}
