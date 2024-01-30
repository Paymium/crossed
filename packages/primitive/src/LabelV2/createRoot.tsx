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
  useRef,
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
const findOtherChilds = (
  children: ReactNode | ReactNode[] | ((_args: any) => ReactNode),
  excludeIds: (string | number)[]
): ReactNode[] => {
  if (!children) {
    return [];
  }
  return Children.toArray(children).filter((child) => {
    if (isValidElement(child)) {
      return !excludeIds.includes((child.type as any)?.id);
    }
    return false;
  });
};

export type CreateRootProps = { role: 'label' };

export const createRoot = <P extends Record<string, any>>(
  Comp: ComponentType<P & CreateRootProps>
) => {
  return (props: P) => {
    const reactId = useId();
    const LabelElement = findChild(props.children, 'label.label');
    const InputElement = findChild(props.children, 'label.input');
    const otherchildren = findOtherChilds(props.children, [
      'label.label',
      'label.input',
    ]);
    const id = LabelElement ? LabelElement.props.id ?? reactId : reactId;
    const inputRef = useRef(null);
    return (
      <Provider id={id}>
        {/* <Comp role="label" id={id} {...(props as any)} /> */}
        <Comp role="label" id={id} {...(props as any)}>
          <>
            <LabelElement onPress={() => inputRef.current?.focus()} />
            <InputElement ref={inputRef} />
          </>
          {otherchildren}
        </Comp>
      </Provider>
    );
  };
};
