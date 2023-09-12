import { useRef, type PropsWithChildren } from 'react';
import { InputProvider, StyleRef } from './context';

export const InputGroup = ({ children }: PropsWithChildren) => {
  const styleRef = useRef<StyleRef>({});
  const setStyleRef = (style: StyleRef) => {
    styleRef.current = style;
  };
  return (
    <InputProvider style={styleRef} setStyle={setStyleRef}>
      {children}
    </InputProvider>
  );
};
