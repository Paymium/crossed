'use client';
import { styled } from '@crossed/styled';
import { HtmlHTMLAttributes, memo } from 'react';

export const Body = styled(
  memo((props: HtmlHTMLAttributes<HTMLBodyElement>) => <body {...props} />),
  (t) => ({ backgroundColor: t?.colors?.background }),
  { name: 'Body', debug: true }
);
