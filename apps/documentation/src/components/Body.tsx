'use client';
import { useStyles } from '@crossed/styled';
import { HtmlHTMLAttributes, forwardRef } from 'react';

export const Body = forwardRef<
  HTMLBodyElement,
  HtmlHTMLAttributes<HTMLBodyElement>
>((props, ref) => {
  const { theme } = useStyles();

  return (
    <body
      ref={ref}
      {...props}
      style={{ backgroundColor: theme?.colors?.background }}
    />
  );
});
