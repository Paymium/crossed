/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import '@/style.config';
import { composeStyles, createStyles } from '@crossed/styled';
import { Center, Text, XBox, YBox } from '@crossed/ui';
import { themes } from 'prism-react-renderer';
import { PropsWithChildren, ReactNode, useCallback } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

const styles = createStyles((t) => ({
  liveEditor: {
    base: {
      width: '100%',
      borderRadius: 14,
      fontFamily: t.font.family,
      fontSize: t.font.fontSize.md,
    },
  },
  preview: {
    base: {
      padding: t.space.xs,
      alignItems: 'stretch',
      flexShrink: 1,
      flex: 1,
    },
  },
  containerPreview: {
    base: {
      flexShrink: 1,
      borderWidth: 1,
      borderColor: t.colors.border.primary,
      borderStyle: 'solid',
      borderRadius: 4,
      backgroundColor: t.colors.background.hover,
    },
    web: {
      base: {
        boxShadow: '0px 1px 4px 0px #00000026',
      },
    },
  },
  containerVariants: {
    base: {
      borderTopWidth: 0,
      borderBottomWidth: 0,
      borderRightWidth: 0,
      borderWidth: 1,
      borderColor: t.colors.border.primary,
      borderStyle: 'solid',
      padding: t.space.xs,
      width: 250,
    },
  },
  pre: {
    base: {
      backgroundColor: t.draculaTheme.plain.backgroundColor,
      width: '100%',
      padding: t.space.xxs,
      boxSizing: 'border-box',
      margin: 0,
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 1,
      // borderColor: t.colors.neutral.bright,
      borderStyle: 'solid',
      // color: t.colors.neutral['100'],
    },
  },
  liveError: {
    base: {
      // color: t.colors.error.bright,
    },
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
      <XBox style={styles.containerPreview}>
        <Center style={styles.preview}>{children}</Center>
        {variants && (
          <YBox space="md" style={styles.containerVariants}>
            {variants}
          </YBox>
        )}
      </XBox>
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
          {fileName && <Text style={styles.pre}>{fileName}</Text>}
          <LiveEditor
            theme={themes.dracula}
            {...styles.liveEditor.className({
              className: fileName ? 'filename' : '',
            })}
          />
          {preview && (
            <LiveError
              {...composeStyles(styles.pre, styles.liveError).className()}
            />
          )}
        </YBox>
      </LiveProvider>
    </YBox>
  );
};
