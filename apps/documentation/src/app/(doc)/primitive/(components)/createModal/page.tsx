'use client';
import { TemplatePrimitive } from '../templatePrimitive';
import { useTranslation } from 'react-i18next';

export default function CreateModal() {
  const { t } = useTranslation();
  return (
    <TemplatePrimitive
      title="createModal"
      description={t('Creation primitive Modal')}
      params={[]}
      return={[]}
      types={[]}
      anatomy={`
import { createModal } from "@crossed/primitive";

const Modal = createModal({
  Root,
  Trigger,
  Content,
  Portal,
  Overlay,
  Title,
  Description,
});

<Modal>
  <Modal.Trigger />
  <Modal.Portal>
    <Modal.Overlay />
    <Modal.Content>
      <Modal.Trigger />
      <Modal.Title />
      <Modal.Description />
    </Modal.Content>
  </Modal.Portal>
</Modal>`}
      example={`
import { createModal } from "@crossed/primitive";

const Modal = createModal({
  Root,
  Trigger,
  Content,
  Portal,
  Overlay,
  Title,
  Description,
});
`}
    />
  );
}
