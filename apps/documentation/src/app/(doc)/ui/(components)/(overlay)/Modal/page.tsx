/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { useTranslation } from 'react-i18next';
import { TemplatePrimitive } from '../../templatePrimitive';
import {
  Box,
  Button,
  ButtonText,
  Checkbox,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalPortal,
  ModalTitle,
  ModalTrigger,
  Select,
  Text,
} from '@crossed/ui';
import { useState } from 'react';
export default function CreateBadge() {
  const { t } = useTranslation();
  const [size, setSize] = useState('md');
  const [closeOnPress, setCloseOnPress] = useState(true);
  return (
    <TemplatePrimitive
      title="Dialog"
      description={t('dialog description')}
      params={[]}
      return={[]}
      types={[]}
      anatomy={`// coming soon`}
      example={`
<Modal size="${size}">
  <ModalTrigger asChild>
    <Button>
      <ButtonText>open</ButtonText>
    </Button>
  </ModalTrigger>
  <ModalPortal>
    <ModalOverlay closeOnPress={${closeOnPress}} />
    <ModalContent>
      <ModalHeader>
        <ModalTitle>Title</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Text>open</Text>
      </ModalBody>
      <ModalFooter>
        <ModalTrigger asChild>
          <Button variant="tertiary">
            <ButtonText>Close</ButtonText>
          </Button>
        </ModalTrigger>
        <ModalTrigger asChild>
          <Button>
            <ButtonText>Validate</ButtonText>
          </Button>
        </ModalTrigger>
      </ModalFooter>
    </ModalContent>
  </ModalPortal>
</Modal>`}
      scope={{
        Modal,
        ModalTrigger,
        ModalContent,
        ModalPortal,
        ModalOverlay,
        ModalTitle,
        ModalFooter,
        ModalHeader,
        ModalBody,
        Button,
        ButtonText,
        Text,
      }}
      variants={
        <Box>
          <Select value={size} onChange={setSize}>
            <Select.Trigger>
              <Select.Value />
            </Select.Trigger>
            <Select.Content>
              {['sm', 'md', 'lg'].map((key) => {
                return (
                  <Select.Option value={key} key={key}>
                    <Text>{key}</Text>
                  </Select.Option>
                );
              })}
            </Select.Content>
          </Select>
          <Checkbox
            checked={closeOnPress}
            onChecked={(e) => setCloseOnPress(e)}
          >
            <Text>close on press</Text>
          </Checkbox>
        </Box>
      }
    />
  );
}
