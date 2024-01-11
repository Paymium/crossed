"use client";
import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../templatePrimitive';

export default function CreateSheet() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="createSheet"
      description={t('Creation primitive Sheet')}
      params={[]}
      return={[]}
      types={[]}
      anatomy={`
import { createSheet } from "@crossed/primitive";

// API draft`}
      example={`// API draft`}
    />
  );
}
