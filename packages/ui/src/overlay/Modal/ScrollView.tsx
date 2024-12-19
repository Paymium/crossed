/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { memo, useContext } from 'react';
import { ScrollView as RNScrollView } from 'react-native';
import { localContext } from './context';
import { Sheet } from '../Sheet';

export const ModalScrollView = memo((props) => {
  const { showSheet } = useContext(localContext);

  return showSheet ? (
    <Sheet.ScrollView {...props} />
  ) : (
    <RNScrollView {...props} />
  );
});
