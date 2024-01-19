/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { useStyles } from '@crossed/styled';
import { YBox } from '@crossed/ui';
import { Highlight, HighlightProps, themes, Prism } from 'prism-react-renderer';

export const CodeBlock = ({
  children,
  fileName,
  showLine,
  ...props
}: Omit<HighlightProps, 'children' | 'code'> & {
  children: string | string[];
  fileName?: string;
  showLine?: boolean;
}) => {
  const { theme } = useStyles();
  return (
    <Highlight
      theme={themes.dracula}
      prism={Prism}
      code={(Array.isArray(children) ? children.join('') : children).trim()}
      language="tsx"
      {...(props as any)}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <YBox>
          {fileName && (
            <pre
              style={{
                ...style,
                width: '100%',
                padding: theme.space.md,
                boxSizing: 'border-box',
                margin: 0,
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
                borderTopWidth: 0,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderBottomWidth: '1px',
                borderColor: theme.colors.backgroundStrong,
                borderStyle: 'solid',
              }}
            >
              {fileName}
            </pre>
          )}
          <pre
            style={{
              ...style,
              textAlign: 'left',
              margin: `0`,
              padding: theme.space.md,
              borderTopLeftRadius: fileName ? 0 : 4,
              borderTopRightRadius: fileName ? 0 : 4,
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
              width: '100%',
              overflow: 'auto',
              boxSizing: 'border-box',
              gap: theme.space.xs,
              display: 'flex',
              flexDirection: 'column',
            }}
            className={className}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {showLine && (
                  <span
                    style={{
                      paddingRight: theme.space.sm,
                      marginRight: theme.space.sm,
                      borderTopWidth: 0,
                      borderLeftWidth: 0,
                      borderBottomWidth: 0,
                      borderRightWidth: '1px',
                      borderStyle: 'solid',
                      borderColor: theme.colors.neutral,
                      display: 'inline-block',
                    }}
                  >
                    {i + 1}
                  </span>
                )}
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        </YBox>
      )}
    </Highlight>
  );
};
