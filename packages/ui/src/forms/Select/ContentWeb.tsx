/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { MenuList } from '../../display/MenuList';
import { useSelectProvider } from './context';
import { form } from '../../styles/form';
import { useSelect } from './styles';
import type { ContentProps } from './types';
import { composeStyles, createStyles } from '@crossed/styled';

const styles = createStyles(() => ({ dynamic: (e: any) => e }));
export const ContentWeb = ({ sheetProps, ...props }: ContentProps) => {
  const {
    // triggerLayout,
    open,
    refs,
    floatingStyles,
    error,
  } = useSelectProvider();

  // const { width } = (triggerLayout.current as any) || {
  //   top: 0,
  //   height: 0,
  //   left: 0,
  // };

  return open ? (
    <MenuList
      {...props}
      ref={refs.setFloating}
      style={composeStyles(
        form.input,
        error && form.inputError,
        useSelect.content,
        styles.dynamic(floatingStyles)
      )}
    />
  ) : null;
};

ContentWeb.id = 'Select.Content';
ContentWeb.displayName = 'Select.Content';
