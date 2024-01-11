'use client';
import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../templatePrimitive';

export default function CreateLabel() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="createLabel"
      description={t('Creation primitive Label')}
      params={[]}
      return={[]}
      types={[]}
      anatomy={`
import { createLabel } from "@crossed/primitive";

const Label = createLabel({
  Root,
  Text,
})

<Label>
  <Label.Text />
  <Label.Input />
</Label>`}
      example={`
import { createLabel } from "@crossed/primitive";

const Input = createLabel({
  Root,
  Text,
});

`}
    />
  );
}
