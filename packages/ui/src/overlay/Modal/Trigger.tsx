/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Floating } from '../Floating';
import { ComponentProps } from 'react';

export const ModalTrigger = (
  props: ComponentProps<typeof Floating.Trigger>
) => <Floating.Trigger {...props} />;
ModalTrigger.displayName = 'Modal.Trigger';
