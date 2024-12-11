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
import { composeStyles, createStyles, inlineStyle } from '@crossed/styled';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const duration = 100;
const styles = createStyles(() => ({ dynamic: (e) => e }));
export const ContentWeb = ({ sheetProps, ...props }: ContentProps) => {
  const { triggerLayout, open, refs, floatingStyles } = useSelectProvider();

  const { width } = (triggerLayout.current as any) || {
    top: 0,
    height: 0,
    left: 0,
  };
  return open ? (
    <Animated.View
      exiting={FadeOut.duration(duration)}
      entering={FadeIn.duration(duration)}
    >
      <MenuList
        {...(props as any)}
        ref={refs.setFloating as any}
        style={composeStyles(
          form.input,
          useSelect.content,
          inlineStyle(() => ({ web: { base: { overflowY: 'auto' } } })),
          styles.dynamic({ ...floatingStyles, minWidth: width })
        )}
      />
    </Animated.View>
  ) : null;
};

ContentWeb.id = 'Select.Content';
ContentWeb.displayName = 'Select.Content';
