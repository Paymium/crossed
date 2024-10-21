/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Children, useContext, useMemo } from 'react';
import { Floating } from '../Floating';
import { composeStyles, inlineStyle } from '@crossed/styled';
import { modalStyles } from '../styles';
import { createStyles } from '@crossed/styled';
import { localContext } from './context';
import { YBoxProps } from '../../layout/YBox';
import { ScrollView as SV } from '../../other/ScrollView';
import { sheetContext, useSheetContext } from '../Sheet/context';
import { ModalHeader } from './Header';
import { ModalBody } from './Body';
import { ModalFooter } from './Footer';
import { Sheet } from '../Sheet';

const styles = createStyles(() => ({
  default: { base: { maxHeight: '95%' } },
  sm: {
    media: {
      xs: { width: '90%', maxHeight: '90%' },
      md: { maxWidth: 560, height: 'auto' },
    },
  },
  md: {
    media: {
      xs: { width: '90%', maxHeight: '90%' },
      md: { maxWidth: 760, height: 'auto' },
    },
  },
  lg: {
    media: {
      xs: { width: '90%', maxHeight: '90%' },
      md: { maxWidth: 1024, height: 'auto' },
    },
  },
}));

export const ModalContent = ({ children, ...props }: YBoxProps) => {
  const localContextInstance = useContext(localContext);
  const sheetContextValue = useSheetContext();

  const { size, showSheet, stickyFooter, stickyHeader } = localContextInstance;

  const title = useMemo(() => {
    if (!children || typeof children === 'number') return null;
    return Children.toArray(children).find(
      (e) => typeof e === 'object' && 'type' in e && e.type === ModalHeader
    );
  }, [children]);

  const body = useMemo(() => {
    if (!children || typeof children === 'number') return null;
    return Children.toArray(children).find(
      (e) => typeof e === 'object' && 'type' in e && e.type === ModalBody
    );
  }, [children]);

  const footer = useMemo(() => {
    if (!children || typeof children === 'number') return null;
    return Children.toArray(children).find(
      (e) => typeof e === 'object' && 'type' in e && e.type === ModalFooter
    );
  }, [children]);

  return (
    <Floating.Portal
      style={inlineStyle(() => ({
        base: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }))}
    >
      <localContext.Provider value={localContextInstance}>
        <sheetContext.Provider value={sheetContextValue}>
          {showSheet ? (
            <Sheet.Frame portal={false}>
              <Sheet.Title>{title}</Sheet.Title>
              {body}
              <Sheet.Footer>{footer}</Sheet.Footer>
            </Sheet.Frame>
          ) : (
            <>
              <Floating.Overlay />
              <Floating.Content
                style={[
                  composeStyles(
                    !showSheet && modalStyles.content,
                    !showSheet && styles.default,
                    !showSheet && styles[size]
                  ).style().style,
                ]}
              >
                <SV
                  containerProps={{
                    style: [
                      inlineStyle(() => ({ base: { flex: 1 } })).style().style,
                    ],
                  }}
                  stickyHeader={stickyHeader}
                  stickyFooter={stickyFooter}
                >
                  <SV.Title>{title}</SV.Title>
                  <SV.Body>{body}</SV.Body>
                  <SV.Footer>{footer}</SV.Footer>
                </SV>
              </Floating.Content>
            </>
          )}
        </sheetContext.Provider>
      </localContext.Provider>
    </Floating.Portal>
  );
};
ModalContent.displayName = 'Modal.Content';
