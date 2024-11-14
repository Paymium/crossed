/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeStyles, createStyles } from '@crossed/styled';
import { Floating } from '../../overlay/Floating';
import { form } from '../../styles/form';
import { ChevronDown } from '@crossed/unicons/ChevronDown';
import { useSelectContext } from './context';
// import { XBox } from '../../layout/XBox';
// import { FormLabel } from '../Form';
// import { useFloatingContext } from '../../overlay/Floating/context';
import { useRef } from 'react';
import { View } from 'react-native';
import { composeRefs } from '@crossed/core';

const styles = createStyles(() => ({
  icon: {
    base: { flexShrink: 0 },
  },
  trigger: {
    base: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexShrink: 1,
      display: 'flex',
      flexBasis: 'auto',
    },
  },
}));
export const SelectTrigger = ({ children }) => {
  const { refs } = useSelectContext();
  // const { open } = useFloatingContext();
  const ref = useRef<View>();
  return (
    <Floating.Trigger
      ref={composeRefs(ref, refs.trigger)}
      style={composeStyles(
        form.input,
        // open && form.inputFocus,
        // error && form.inputError,
        styles.trigger
        // props.style
      )}
      // style={composeStyles(
      //   form.input,
      //   // error && form.inputError,
      //   styles.trigger
      //   // props.style
      // )}
    >
      {/* {Boolean(label || description || extra) && (
        <XBox alignItems="center" space="xxs">
          {Boolean(label) && <FormLabel>{label}</FormLabel>}
          {Boolean(description) && (
            <Text style={form.labelDescription}>{description}</Text>
          )}
          {Boolean(extra) && (
            <Text style={form.labelExtra} textAlign="right">
              {extra}
            </Text>
          )}
        </XBox>
      )} */}
      {/* <XBox
        ref={ref}
        style={composeStyles(
          form.input,
          open && form.inputFocus,
          // error && form.inputError,
          styles.trigger
          // props.style
        )}
      > */}
      {children}
      <ChevronDown
        {...styles.icon.style()}
        color={form.placeholder.style().style.color}
      />
      {/* </XBox> */}
    </Floating.Trigger>
  );
};

SelectTrigger.displayName = 'Select.Trigger';
