/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Text, type TextProps } from './Text';
import { forwardRef, memo } from 'react';
import { Text as RNText } from 'react-native';
import { headingTemplateStyles } from '../styles';
import { composeStyles } from '@crossed/styled';

type HeadingProps = Omit<TextProps, 'fontSize'> & {
  fontSize?: keyof typeof headingTemplateStyles;
};

export const Headline = memo(
  forwardRef<RNText, HeadingProps>(
    ({ fontSize = 'xl', style, ...props }, ref) => {
      return (
        <Text
          {...props}
          style={composeStyles(headingTemplateStyles[fontSize], style)}
          ref={ref}
        />
      );
    }
  )
);
