'use client';
import React, { memo } from 'react';
import { RemoveScroll as RS } from 'react-remove-scroll';

export type RemoveScrollProps = React.ComponentProps<typeof RS>;

export const RemoveScroll = memo((props?: RemoveScrollProps) => {
  if (!props?.children) return null;
  return <RS {...props} />;
});
