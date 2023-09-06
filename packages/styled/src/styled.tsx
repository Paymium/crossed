'use client';

import type {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from 'react';
import { forwardRef, useCallback, useEffect } from 'react';
import { Platform } from 'react-native';
import type { GetProps, PropsFromExtends, StylableComponent } from './types';
import {
  withStaticProperties,
  composeEventHandlers,
  useUncontrolled,
} from '@crossed/core';
import { crossed, merge } from './crossed';
import type {
  BaseWithState,
  Config,
  ConfigSchema,
  ConfigVariants,
  Props,
} from './crossed/types';
import { twMerge } from 'tailwind-merge';
import { StyleSheet } from './styleSheet';

// type ComponentParam<P extends object> = ElementType<P> & {
//   styles?: (p?: Props<any, P>) => BaseWithState<P>;
// };

export const styled = <
  C extends StylableComponent,
  P extends GetProps<C>,
  E extends ((e: any) => any)[],
  T extends ConfigSchema<GetProps<C>> = {}
>(
  Component: C,
  themeConfig: Config<GetProps<C>, T> & { extends?: E }
): ForwardRefExoticComponent<
  PropsWithoutRef<
    PropsFromExtends<E> & {
      className?: string;
      states?: { isActive?: boolean; isFocus?: boolean; isHover?: boolean };
    } & Omit<ConfigVariants<T> & P, 'className'>
  > &
    RefAttributes<any>
> & {
  styles: (p?: Props<T, P>) => BaseWithState<P>;
} => {
  const { extends: extendsStyle, ...themeConfigProps } = themeConfig;
  const stylesClass = crossed<P, T>(themeConfigProps as any);
  type NewComponentProps = PropsFromExtends<E> & {
    className?: string;
    animations?: boolean;
    states?: { isActive?: boolean; isFocus?: boolean; isHover?: boolean };
  } & Omit<ConfigVariants<T> & P, 'className'>;

  const variantNames = Object.keys(
    themeConfigProps.variants || {}
  ) as (keyof T)[];

  const NewComponent = forwardRef<any, NewComponentProps>(
    function CrossedStyledComponent(props, ref) {
      const [active, setActive] = useUncontrolled({
        defaultValue: false,
        value: props.states?.isActive,
      });
      const [hover, setHover] = useUncontrolled({
        defaultValue: false,
        value: props.states?.isHover,
      });
      const [focus, setFocus] = useUncontrolled({
        defaultValue: false,
        value: props.states?.isFocus,
      });
      const { componentProps, variantProps } = Object.entries(props).reduce<{
        componentProps: P;
        variantProps: Props<T, P>;
      }>(
        (acc, [propsName, valueProps]) => {
          if (variantNames.includes(propsName)) {
            (acc.variantProps as any)[propsName as any] =
              valueProps || undefined;
          } else if (!['className', 'states'].includes(propsName)) {
            (acc.componentProps as any)[propsName] = valueProps;
          }
          return acc;
        },
        {
          componentProps: {},
          variantProps: themeConfigProps?.defaultVariants || {},
        } as any
      );
      const styles = stylesClass(variantProps);

      const NewComp = styles.props?.as ? styles.props?.as : Component;
      const asIsString = typeof NewComp === 'string';

      const extendClassName = ((extendsStyle || []) as any[]).reduce<any>(
        (acc, style) => {
          return merge(acc, style(props as any) as any);
        },
        {}
      );

      const variantExtendClassName =
        (props.disabled
          ? extendClassName[':disabled']?.className
          : active
          ? extendClassName[':active']?.className
          : hover
          ? extendClassName[':hover']?.className
          : focus
          ? extendClassName[':focus']?.className
          : extendClassName.className) || extendClassName.className;

      const variantClassName =
        (props.disabled
          ? styles[':disabled']?.className
          : active
          ? styles[':active']?.className
          : hover
          ? styles[':hover']?.className
          : focus
          ? styles[':focus']?.className
          : styles.className) || styles.className;

      const propsVariant = {
        ...styles.props,
        ...(props.disabled
          ? styles[':disabled']?.props
          : active
          ? styles[':active']?.props
          : hover
          ? styles[':hover']?.props
          : focus
          ? styles[':focus']?.props
          : styles.props),
      };

      const baseClassName = twMerge(
        extendClassName?.className,
        variantExtendClassName,
        styles.className,
        variantClassName,
        props.className
      );

      const key = Platform.OS === 'web' ? 'className' : 'style';

      const styleProps = {
        [key]: StyleSheet.create(baseClassName),
      };

      const toto = useCallback(() => {
        setActive(false);
      }, []);

      useEffect(() => {
        if (Platform.OS === 'web' && !hover && active) {
          window.document.body.addEventListener('mouseup', toto);
          return () => {
            window.document.body.removeEventListener('mouseup', toto);
          };
        }
        return () => {};
      }, [hover, active]);

      return (
        <NewComp
          ref={ref}
          {...(componentProps as any)}
          {...propsVariant}
          {...(asIsString
            ? {
                'data-class-name': styleProps.className,
              }
            : {
                dataSet: {
                  className: styleProps.className,
                },
              })}
          style={
            asIsString
              ? { ...styleProps.style, ...componentProps.style }
              : [styleProps.style, componentProps.style]
          }
          onMouseDown={composeEventHandlers(componentProps?.onMouseDown, () => {
            setActive(true);
          })}
          onMouseUp={composeEventHandlers(componentProps?.onMouseUp, () => {
            setActive(false);
          })}
          onMouseEnter={composeEventHandlers(() => {
            setHover(true);
          }, componentProps?.onMouseEnter)}
          onMouseLeave={composeEventHandlers(() => {
            setHover(false);
          }, componentProps?.onMouseLeave)}
          onPressIn={composeEventHandlers(componentProps?.onPressIn, () => {
            setActive(true);
          })}
          onPressOut={composeEventHandlers(componentProps?.onPressOut, () => {
            setActive(false);
          })}
          onHoverIn={composeEventHandlers(() => {
            setHover(true);
          }, componentProps?.onHoverIn)}
          onHoverOut={composeEventHandlers(() => {
            setHover(false);
          }, componentProps?.onHoverOut)}
          onBlur={composeEventHandlers(componentProps?.onBlur, () => {
            setFocus(false);
          })}
          onFocus={composeEventHandlers(componentProps?.onFocus, () => {
            setFocus(true);
          })}
        />
      );
    }
  );

  return withStaticProperties(NewComponent, {
    styles: (p?: Props<T, P>) => {
      const parentStyle = (Component as any).styles?.(p);
      const style = stylesClass(p);
      return parentStyle ? merge(parentStyle, style) : style;
    },
  });
};
