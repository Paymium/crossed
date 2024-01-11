'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../templatePrimitive';

export default function CreateButton() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="createButton"
      description={t("Creation primitive button")}
      params={[]}
      return={[]}
      types={[]}
      anatomy={`
import { createButton } from "@crossed/primitive";

const Button = createButton({
  Root,
  Group,
  Text,
  Element,
})`}
      example={`
import { createButton } from "@crossed/primitive";

const Button = createButton({
  Root,
  Group,
  Text,
  Element,
})`}
    />
  );
}
