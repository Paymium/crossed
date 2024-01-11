'use client';
import { styled, unifyStyle } from '@crossed/styled';
import { HtmlHTMLAttributes, forwardRef } from 'react';

export const Body = styled(
  (
    { children, style, ...props }: HtmlHTMLAttributes<HTMLBodyElement>,
    ref: HTMLBodyElement
  ) => (
    <body {...props} style={unifyStyle(style)}>
      {children}
    </body>
  ),
  (t) => ({ backgroundColor: t?.colors?.background })
);
