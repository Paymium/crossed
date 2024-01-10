'use client';
import { styled } from '@crossed/styled';
import { HtmlHTMLAttributes, forwardRef } from 'react';

export const Body = styled(
  (
    { children, style, ...props }: HtmlHTMLAttributes<HTMLBodyElement>,
    ref: HTMLBodyElement
  ) => (
    <body {...props} style={style[0]}>
      {children}
    </body>
  ),
  (t) => ({ backgroundColor: t?.colors?.background })
);
