/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { Text, type TextProps } from './Text';
import 'react';
import { forwardRef, memo } from 'react';
import { Text as RNText } from 'react-native';
import { headingTemplateStyles } from '../styles';
import { composeStyles } from '@crossed/styled';

type HeadingProps = Omit<TextProps, 'size'> & {
  size?: keyof typeof headingTemplateStyles;
};

export const Headline = memo(
  forwardRef<RNText, HeadingProps>(({ size = 'xl', style, ...props }, ref) => {
    return (
      <Text
        {...props}
        size={null}
        style={composeStyles(headingTemplateStyles[size], style)}
        ref={ref}
      />
    );
  })
);
