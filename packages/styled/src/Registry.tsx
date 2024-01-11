'use client';

import { useServerInsertedHTML } from 'next/navigation';
import { useRef, type PropsWithChildren, useState, useEffect, useMemo } from 'react';
import { AppRegistry } from 'react-native';

export const Registry = ({ children }: PropsWithChildren) => {
  const ref = useRef(false);
  const [state, setState] = useState(false);
  useServerInsertedHTML(() => {
    if (ref.current) return;
    ref.current = true;
    AppRegistry.registerComponent('Registry', () => Registry);

    const { getStyleElement } = (AppRegistry as any).getApplication('Registry');
    return <>{getStyleElement()}</>;
  });
  useEffect(() => {
    setState(true);
  }, []);
  return useMemo(()=>children, [state]);
};
