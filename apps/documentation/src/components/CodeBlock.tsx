/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { GetProps } from '@crossed/core';
import { withStyle } from '@crossed/styled';
import { Alert, Center, Text, XBox, YBox } from '@crossed/ui';
import { themes } from 'prism-react-renderer';
import { PropsWithChildren, ReactNode, useCallback } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

const StyledLiveEditor = withStyle(
  ({ style, ...props }: GetProps<typeof LiveEditor>) => {
    return <LiveEditor {...props} />;
  },
  ({ theme: t }) => ({
    base: {
      width: '100%',
      borderRadius: 4,
      fontFamily: t.fontFamily,
      fontSize: t.fontSize.sm,
    },
  })
);

const RenderPreview = withStyle(Center, ({ theme: t }) => ({
  base: {
    padding: t.space.md,
    alignItems: 'stretch',
  },
}));

const ContainerPreview = withStyle(XBox, ({ theme: t }) => ({
  base: {
    borderWidth: 1,
    borderColor: t.colors.neutral,
    borderStyle: 'solid',
    borderRadius: 4,
  },
}));
const ContainerVariants = withStyle(YBox, ({ theme: t }) => ({
  base: {
    borderLeftWidth: 1,
    borderColor: t.colors.neutral,
    borderStyle: 'solid',
    padding: t.space.md,
  },
}));

const Pre = withStyle(Text, ({ theme: t }) => ({
  base: {
    backgroundColor: t.draculaTheme.plain.backgroundColor,
    width: '100%',
    padding: t.space.md,
    boxSizing: 'border-box',
    margin: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderColor: t.colors.neutral,
    borderStyle: 'solid',
    color: t.colors.white,
  },
}));

export const CodeBlock = ({
  children,
  scope,
  fileName,
  preview,
  variants,
}: {
  children?: string | string[];
  scope?: any;
  fileName?: string;
  preview?: boolean;
  variants?: ReactNode;
}) => {
  const Component = useCallback(
    ({ children }: PropsWithChildren) => (
      <ContainerPreview>
        <RenderPreview style={{ flex: 1 }}>{children}</RenderPreview>
        {variants && (
          <ContainerVariants space="md">{variants}</ContainerVariants>
        )}
      </ContainerPreview>
    ),
    [variants, children]
  );
  return (
    <YBox space="md">
      <LiveProvider
        code={(Array.isArray(children) ? children.join('') : children).trim()}
        scope={scope}
        disabled={true}
      >
        {preview && <LivePreview Component={Component} />}
        <YBox>
          {fileName && <Pre>{fileName}</Pre>}
          <StyledLiveEditor
            theme={themes.dracula}
            className={fileName ? 'filename' : ''}
          />
          {preview && (
            <Alert>
              <LiveError />
            </Alert>
          )}
        </YBox>
      </LiveProvider>
    </YBox>
  );
};
