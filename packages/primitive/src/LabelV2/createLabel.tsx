/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { ComponentType } from 'react';
import { useContext } from './context';

export type CreateLabelProps = { id: string };

export const createLabel = <P extends Record<string, any>>(
  Comp: ComponentType<P & CreateLabelProps>
) => {
  return (props: P) => {
    const context = useContext();
    return <Comp id={context.id} {...props} />;
  };
};
