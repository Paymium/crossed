/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import React, { FunctionComponent } from 'react';
import { useTheme } from '../useTheme';

export const withReactive =
  <P extends object>(Comp: FunctionComponent<P>): FunctionComponent<P> =>
  (props: P) => {
    useTheme();
    return <Comp {...(props as any)} />;
  };
