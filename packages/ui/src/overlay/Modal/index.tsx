/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeStyles, createStyles, inlineStyle } from '@crossed/styled';
import { XBox } from '../../layout/XBox';
import { Box, type BoxProps } from '../../layout/Box';
import { withDefaultProps, withStaticProperties } from '@crossed/core';
import { CloseButton } from '../../other/CloseButton';
import { ModalRoot } from './Root';
import { ModalContent } from './Content';
import { Floating } from '../Floating';
import { Text, TextProps } from '../../typography/Text';

const styles = createStyles((t) => ({
  overlay: {
    base: {
      position: 'absolute',
      backgroundColor: t.colors.black,
      opacity: 0.5,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  },
  portal: {
    base: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  header: {
    media: {
      xs: { flexDirection: 'column-reverse', alignItems: 'flex-end' },
      md: { flexDirection: 'row' },
    },
  },
  title: {
    base: {
      flex: 1,
      color: t.colors.text.primary,
    },
    media: {
      xs: {
        textAlign: 'center',
        alignSelf: 'stretch',
        fontWeight: t.font.fontWeight.h6,
        lineHeight: t.font.lineHeight.md,
        fontSize: t.font.fontSize.md,
      },
      md: {
        textAlign: 'left',
        fontWeight: t.font.fontWeight.h6,
        lineHeight: t.font.lineHeight.h6,
        fontSize: t.font.fontSize.xl,
      },
    },
  },
  body: {
    base: { flex: 1 },
  },
}));

const ModalTitle = (props: TextProps) => {
  return <Text {...props} {...composeStyles(styles.title).rnw()} />;
};
ModalTitle.displayName = 'Modal.Title';

const ModalTrigger = Floating.Trigger;
ModalTrigger.displayName = 'Modal.Trigger';

const ModalBody = (props: BoxProps) => (
  <Box {...props} {...composeStyles(styles.body).rnw()} />
);
ModalBody.displayName = 'Modal.Body';

const ModalHeader = ({ children, style, ...props }: BoxProps) => {
  return (
    <Box {...props} style={composeStyles(styles.header, style)}>
      {children}
      <Floating.Trigger asChild>
        <CloseButton
          style={inlineStyle(() => ({
            base: { position: 'absolute', right: 0 },
          }))}
        />
      </Floating.Trigger>
    </Box>
  );
};
ModalHeader.displayName = 'Modal.Header';

const ModalFooter = withDefaultProps(XBox, {
  justifyContent: 'end',
  space: 'xs',
});
ModalFooter.displayName = 'Modal.Footer';

export const Modal = withStaticProperties(ModalRoot, {
  Content: ModalContent,
  Title: ModalTitle,
  Trigger: ModalTrigger,
  Footer: ModalFooter,
  Header: ModalHeader,
  Body: ModalBody,
});

export {
  ModalContent,
  ModalTitle,
  ModalTrigger,
  ModalFooter,
  ModalHeader,
  ModalBody,
};
