/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { styled } from '@crossed/styled';
import { Alert, Text, YBox } from '@crossed/ui';
import { themes } from 'prism-react-renderer';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

const StyledLiveEditor = styled(LiveEditor, {
  width: '100%',
  borderRadius: 4,
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
});

const LivePreviewStyled = styled(LivePreview, {
  alignSelf: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});
const Pre = styled(Text, (t) => ({
  backgroundColor: themes.dracula.plain.backgroundColor,
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
}));

export const CodeBlock = ({
  children,
  scope,
  fileName,
  preview,
}: {
  children?: string | string[];
  scope?: any;
  fileName?: string;
  preview?: boolean;
}) => {
  return (
    <YBox space="md">
      <LiveProvider
        code={(Array.isArray(children) ? children.join('') : children).trim()}
        scope={scope}
        disabled={true}
      >
        {preview && <LivePreviewStyled />}
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
