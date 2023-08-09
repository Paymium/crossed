import { createScope, styled, withStaticProperties } from '@mergeui/core';
import { useId, type PropsWithChildren, cloneElement } from 'react';
import { Text } from 'react-native';
import type { GetProps } from '../types';
import { Box } from '../Box';

export const [LabelText] = styled(Text, {
  base: {
    styles: ['text-zinc-400'],
    props: {
      as: 'label',
    },
  },
  variants: {
    invalid: {
      true: { styles: ['text-red-500'] },
    },
  },
});

const [Provider, useContext] = createScope<{ id?: string } & LabelProps>({
  id: undefined,
});

export type LabelProps = {
  invalid?: boolean;
};

export const Label = withStaticProperties(
  ({ children, invalid }: PropsWithChildren<LabelProps>) => {
    const id = useId();
    return (
      <Provider id={id} invalid={invalid}>
        <Box>{children}</Box>
      </Provider>
    );
  },
  {
    Text: (props: GetProps<typeof LabelText>) => {
      const { id, invalid } = useContext();
      return (
        <LabelText
          // @ts-ignore
          htmlFor={id}
          invalid={invalid}
          {...props}
        />
      );
    },
    Input: ({ children }: PropsWithChildren) => {
      const { id } = useContext();
      return cloneElement(children as any, { id });
    },
  }
);
