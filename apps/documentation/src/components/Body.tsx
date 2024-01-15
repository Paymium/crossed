'use client';
import { styled, unifyStyle } from '@crossed/styled';
import { HtmlHTMLAttributes, memo } from 'react';

export const Body = styled(
  memo(({ children, style, ...props }: HtmlHTMLAttributes<HTMLBodyElement>) => (
    <body {...props} style={unifyStyle(style)}>
      {children}
    </body>
  )),
  (t) => ({ backgroundColor: t?.colors?.background }),
  { name: 'Body' }
);
