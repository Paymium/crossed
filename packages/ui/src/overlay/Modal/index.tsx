/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withStaticProperties } from '@crossed/core';
import { ModalRoot } from './Root';
import { ModalContent } from './Content';
import { ModalTitle } from './Title';
import { ModalFooter } from './Footer';
import { ModalBody } from './Body';
import { ModalTrigger } from './Trigger';
import { ModalHeader } from './Header';
import { ModalScrollView } from './ScrollView';
import { ModalPadded } from './Padded';

export const Modal = withStaticProperties(ModalRoot, {
  Content: ModalContent,
  Title: ModalTitle,
  Trigger: ModalTrigger,
  Footer: ModalFooter,
  Header: ModalHeader,
  Body: ModalBody,
  ScrollView: ModalScrollView,
  Padded: ModalPadded,
});

export {
  ModalContent,
  ModalTitle,
  ModalTrigger,
  ModalFooter,
  ModalHeader,
  ModalBody,
  ModalScrollView,
  ModalPadded,
};
