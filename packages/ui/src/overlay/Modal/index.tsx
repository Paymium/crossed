/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  type ModalContentProps,
  type ModalOverlayProps,
  type ModalPortalProps,
  type ModalProps,
  type ModalTitleProps,
  createModal,
  type ModalBodyComponent,
} from '@crossed/primitive';
import { composeStyles, createStyles } from '@crossed/styled';
import { createContext, useContext } from 'react';
import { XBox } from '../../layout/XBox';
import { Box, type BoxProps } from '../../layout/Box';
import { withDefaultProps } from '@crossed/core';
import { CloseButton } from '../../other/CloseButton';

const modalStyles = createStyles((t) => ({
  content: {
    base: {
      borderRadius: 8,
      // backgroundColor: t.colors.neutral[100],
      margin: 'auto',
      padding: t.space.xs,
    },
    web: {
      base: {
        boxShadow: '0px 8px 24px 0px #0000001A',
      },
    },
  },
  sm: {
    media: {
      xs: { width: '90%', height: '50%' },
      md: { width: 560, height: 'auto' },
    },
  },
  md: {
    media: {
      xs: { width: '90%', height: '50%' },
      md: { width: 760, height: 'auto' },
    },
  },
  lg: {
    media: {
      xs: { width: '90%', height: '50%' },
      md: { width: 1024, height: 'auto' },
    },
  },
  overlay: {
    base: {
      position: 'absolute',
      // backgroundColor: t.colors.neutral[900],
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
const {
  Modal: PModal,
  ModalContent: PModalContent,
  ModalOverlay: PModalOverlay,
  ModalTitle: PModalTitle,
  ModalTrigger: PModalTrigger,
  ModalPortal: PModalPortal,
  ModalBody: PModalBody,
} = createModal();

type VariantSize = { size: 'sm' | 'md' | 'lg' };

const localContext = createContext<VariantSize>({ size: 'md' });
const Modal = ({ size = 'md', ...props }: ModalProps & VariantSize) => {
  return (
    <localContext.Provider value={{ size }}>
      <PModal {...props} />
    </localContext.Provider>
  );
};
const ModalContent = (props: ModalContentProps) => {
  const { size } = useContext(localContext);
  return (
    <PModalContent
      {...props}
      {...composeStyles(modalStyles.content, modalStyles[size]).rnw()}
    />
  );
};
const ModalOverlay = (props: ModalOverlayProps) => {
  return (
    <PModalOverlay {...props} {...composeStyles(modalStyles.overlay).rnw()} />
  );
};
const ModalTitle = (props: ModalTitleProps) => {
  return <PModalTitle {...props} {...composeStyles(modalStyles.title).rnw()} />;
};
const ModalTrigger = PModalTrigger;

const ModalBody: ModalBodyComponent = (props) => (
  <PModalBody {...props} {...composeStyles(modalStyles.body).rnw()} />
);

const ModalHeader = ({ children, style, ...props }: BoxProps) => {
  return (
    <Box {...props} style={composeStyles(modalStyles.header, style)}>
      {children}
      <ModalTrigger asChild>
        <CloseButton />
      </ModalTrigger>
    </Box>
  );
};
const ModalPortal = ({ children, ...props }: ModalPortalProps) => {
  const context = useContext(localContext);
  return (
    <PModalPortal {...props} {...composeStyles(modalStyles.portal).rnw()}>
      <localContext.Provider value={context}>{children}</localContext.Provider>
    </PModalPortal>
  );
};

const ModalFooter = withDefaultProps(XBox, {
  justifyContent: 'end',
  space: 'md',
});

export {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalTitle,
  ModalTrigger,
  ModalPortal,
  ModalFooter,
  ModalHeader,
  ModalBody,
};
