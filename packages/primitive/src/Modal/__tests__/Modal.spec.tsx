/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import '@testing-library/jest-dom';
import { render, userEvent, screen } from '@crossed/test';

import {
  createModal,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalTitle,
  ModalTrigger,
  ModalPortal,
  ModalBody,
} from '../';
import { Text } from 'react-native';
import { PortalProvider } from '@gorhom/portal';

describe('createModal', () => {
  test('return from createModal', async () => {
    const modal = createModal();
    expect(Object.keys(modal)).toEqual([
      'modalContext',
      'Modal',
      'ModalContent',
      'ModalOverlay',
      'ModalTitle',
      'ModalTrigger',
      'ModalPortal',
      'ModalBody',
    ]);
  });

  test('open/close component', async () => {
    const {} = render(
      <PortalProvider>
        <Modal>
          <ModalTrigger testID="trigger">
            <Text>toto</Text>
          </ModalTrigger>
          <ModalPortal>
            <ModalOverlay testID="overlay" />
            <ModalContent testID="content">
              <ModalTitle>toto</ModalTitle>
              <ModalTrigger testID="close">
                <Text>close</Text>
              </ModalTrigger>
              <ModalBody>
                <Text>toto</Text>
              </ModalBody>
            </ModalContent>
          </ModalPortal>
        </Modal>
      </PortalProvider>
    );

    const open = async () => {
      await userEvent.click(screen.getByTestId('trigger'));
    };

    expect(() => screen.getByTestId('content')).toThrow();
    await open();
    expect(screen.getByTestId('content')).toBeVisible();
    await userEvent.click(screen.getByTestId('close'));
    expect(() => screen.getByTestId('content')).toThrow();
  });
});
