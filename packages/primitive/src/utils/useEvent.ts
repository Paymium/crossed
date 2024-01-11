import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

type AnyFunction = (..._args: any[]) => any;

export function useEvent<T extends AnyFunction>(callback?: T): T {
  return useGet(callback, defaultValue, true) as T;
}

const defaultValue = () => {
  throw new Error('Cannot call an event handler while rendering.');
};

const isClient = typeof window !== 'undefined';
const useIsomorphicLayoutEffect = isClient ? useLayoutEffect : useEffect;

// keeps a reference to the current value easily

export function useGet<A>(
  currentValue: A,
  initialValue?: any,
  forwardToFunction?: boolean
): () => A {
  const curRef = useRef<any>(initialValue ?? currentValue);
  useIsomorphicLayoutEffect(() => {
    curRef.current = currentValue;
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(
    forwardToFunction
      ? (...args) => curRef.current?.apply(null, args)
      : () => curRef.current,
    []
  );
}
