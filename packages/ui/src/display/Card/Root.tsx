/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { forwardRef } from 'react';
import { YBox, type YBoxProps } from '../../layout';
import { composeStyles } from '@crossed/styled';
import { cardStyles } from './styles';

/**
 * Represents the properties for a card component.
 * Utilizes properties from YBoxProps and allows for an optional size specification.
 *
 * @typedef {object} CardProps
 *
 * @property {'auto' | 'xs' | 'sm' | 'md' | 'lg'} [size]
 * Optional size indication for the card, allowing predefined sizes: 'auto', 'xs', 'sm', 'md', or 'lg'.
 * Defaults to 'auto' if not specified.
 */
type CardProps = YBoxProps;

/**
 * CardRoot is a forwardRef component that renders a YBox element with
 * customizable styles and properties.
 *
 * @param {object} props - The properties passed to the component.
 * @param {string} [props.size='auto'] - Defines the size of the card, with a default value of 'auto'. The size can affect spacing styles.
 * @param {any} ref - A React ref to be forwarded to the YBox component.
 *
 * @returns {JSX.Element} A styled YBox component based on the provided properties.
 */
export const CardRoot = forwardRef(
  ({ role, style, ...props }: CardProps, ref: any) => {
    return (
      <YBox
        ref={ref}
        role={role}
        space={'md'}
        {...props}
        style={composeStyles(cardStyles.root, style)}
      />
    );
  }
);
/**
 * The `CardRoot.displayName` is a static property that holds a string used for debugging purposes.
 * This displayName is mainly used in React developer tools to identify the component by name.
 *
 * By setting the `displayName`, it becomes easier to locate components in the React tree,
 * especially when using higher-order components or wrapping a component multiple times.
 *
 * It is not necessary for the functionality of the component itself, but it greatly aids in
 * the development and debugging process by providing a clear and recognizable name for the component.
 */
CardRoot.displayName = 'Card';
