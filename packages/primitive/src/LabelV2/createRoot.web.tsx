/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  useId,
  type ComponentType,
  ReactNode,
  Children,
  isValidElement,
} from 'react';
import { Provider } from './context';

const findChild = (
  children: ReactNode | ReactNode[] | ((_args: any) => ReactNode),
  value: string | number
): ReactNode | undefined => {
  if (!children) {
    return;
  }
  return typeof children === 'function'
    ? undefined
    : Children.toArray(children).reduce<ReactNode | undefined>((acc, e) => {
        if (acc || !isValidElement(e)) {
          return acc;
        }
        if (e.type && (e.type as any)?.id === value) {
          acc = e;
          return acc;
        } else {
          acc = findChild(e?.props?.children, value);
        }
        return acc;
      }, undefined);
};

export type CreateRootProps = { role: 'label' };

export const createRoot = <P extends Record<string, any>>(
  Comp: ComponentType<P & CreateRootProps>
) => {
  return (props: P) => {
    const reactId = useId();
    const labelElement = findChild(props.children, 'label.label');
    const id = labelElement ? labelElement.props.id ?? reactId : reactId;
    return (
      <Provider id={id}>
        <Comp role="label" id={id} {...(props as any)} />
      </Provider>
    );
  };
};
