'use client';
import { styled } from '@crossed/styled';
import { HtmlHTMLAttributes, forwardRef } from 'react';

export const Body = styled(
  forwardRef<HTMLBodyElement, HtmlHTMLAttributes<HTMLBodyElement>>(
    (props, ref) => {
      return (
        <body
          ref={ref}
          {...props}
        />
      );
    }
  ),
  (theme)=>({ backgroundColor: "black" })
);
