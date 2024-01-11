'use client';
import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../templatePrimitive';

export default function CreateInput() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="createInput"
      description={t('Creation primitive Input')}
      params={[]}
      return={[]}
      types={[]}
      anatomy={`
import { createInput } from "@crossed/primitive";

const Input = createInput({
  Group,
  Addon,
  Element,
  Input,
})`}
      example={`
import { createInput } from "@crossed/primitive";

const Input = createInput({
  Group,
  Addon,
  Element,
  Input,
})`}
    />
  );
}
