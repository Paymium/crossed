/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { ComponentProps, useContext } from 'react';
import { localContext } from './context';
import { Headline } from '../../typography';

export const ModalTitle = (props: ComponentProps<typeof Headline>) => {
  const { idRef } = useContext(localContext);
  return <Headline size="lg" id={`${idRef}-title`} {...props} />;
};
ModalTitle.displayName = 'Modal.Title';
