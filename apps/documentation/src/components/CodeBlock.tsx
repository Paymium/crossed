/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { styled } from '@crossed/styled';
import type { GetProps } from '@crossed/core';
import { Box } from '@crossed/ui';
import { HighlightProps } from 'prism-react-renderer';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

type LiveEditorProps = GetProps<typeof LiveEditor>;

const StyledLiveEditor = styled(
  (props: LiveEditorProps) => {
    return <LiveEditor {...props} style={props.style[0]} />;
  },
  {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  }
);

export const CodeBlock = ({
  children,
  scope,
}: Omit<HighlightProps, 'children' | 'code'> & {
  children?: string | string[];
  scope?: any;
}) => {
  return (
    <>
      <Box
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          width: '100%',
        }}
      >
        <Box style={{ width: '100%' }} space="md">
          <LiveProvider
            code={(Array.isArray(children)
              ? children.join('')
              : children
            ).trim()}
            scope={scope}
            disabled={true}
          >
            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
              }}
              space="md"
            >
              <LivePreview
                style={{
                  alignSelf: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              />
            </Box>
            <StyledLiveEditor />
            <LiveError />
          </LiveProvider>
        </Box>
      </Box>
    </>
  );
};
