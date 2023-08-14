import {
  GetProps,
  createScope,
  cx,
  styled,
  withStaticProperties,
} from '@mergeui/core';
import {
  useId,
  type PropsWithChildren,
  cloneElement,
  useRef,
  type MutableRefObject,
  forwardRef,
} from 'react';
import { Platform, Text, View } from 'react-native';
import { Box } from '../layout/Box';

export const LabelText = styled(Text, {
  className: ['dark:text-zinc-400 text-zinc-700'],
  props: {
    as: 'label',
  },
  variants: {
    invalid: {
      true: { className: ['text-red-500'] },
    },
  },
});

const [Provider, useContext] = createScope<
  { id?: string; inputRef?: MutableRefObject<View | undefined> } & LabelProps
>({
  id: undefined,
  inputRef: undefined,
});

export type LabelProps = {
  invalid?: boolean;
};

export const Label = withStaticProperties(
  forwardRef(
    (
      {
        children,
        invalid,
        ...props
      }: PropsWithChildren<LabelProps & Omit<GetProps<typeof Box>, 'children'>>,
      ref: any
    ) => {
      const id = useId();
      const inputRef = useRef();
      return (
        <Provider id={id} invalid={invalid} inputRef={inputRef}>
          <Box
            {...props}
            className={cx('flex-col', props?.className)}
            ref={ref}
          >
            {children}
          </Box>
        </Provider>
      );
    }
  ),
  {
    Text: (props: GetProps<typeof LabelText>) => {
      const { id, invalid, inputRef } = useContext();
      return (
        <LabelText
          // @ts-ignore
          htmlFor={id}
          invalid={invalid}
          {...(Platform.OS === 'web'
            ? {}
            : {
                onPress: () => {
                  inputRef?.current?.focus?.();
                },
              })}
          {...props}
        />
      );
    },
    Input: ({ children }: PropsWithChildren) => {
      const { id, inputRef } = useContext();
      return cloneElement(children as any, { id, ref: inputRef });
    },
  }
);
