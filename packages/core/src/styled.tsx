import type {
  ComponentType,
  ElementType,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from 'react';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import type { GetProps } from './types';
import { withStaticProperties } from './withStaticProperties';
import { composeEventHandlers } from './composeEventHandlers';
import {
  BaseWithState,
  Config,
  ConfigSchema,
  Props,
  crossed,
  merge,
} from './cva';
import { twMerge } from 'tailwind-merge';
import { StyleSheet } from './styleSheet';

export const styled = <
  P extends Record<string, any>,
  T extends ConfigSchema<P> = {}
>(
  Component:
    | (ComponentType<P> & {
        styles?: (p?: Props<T, P>) => BaseWithState<P>;
      })
    | ElementType<P>,
  themeConfigProps: Config<T, P>
): ForwardRefExoticComponent<
  PropsWithoutRef<
    {
      className?: string;
      states?: { isActive?: boolean; isFocus?: boolean; isHover?: boolean };
    } & Omit<Props<T, P>, 'className'> &
      GetProps<typeof Component>
  > &
    RefAttributes<any>
> & {
  styles: (p?: Props<T, P>) => BaseWithState<P>;
} => {
  const stylesClass = crossed<P, T>(themeConfigProps);
  type NewComponentProps = {
    className?: string;
    animations?: boolean;
    states?: { isActive?: boolean; isFocus?: boolean; isHover?: boolean };
  } & Omit<Props<T, P>, 'className'> &
    GetProps<typeof Component>;

  const variantNames = Object.keys(
    themeConfigProps.variants || {}
  ) as (keyof T)[];

  const NewComponent = forwardRef<any, NewComponentProps>(
    function CrossedStyledComponent(props, ref) {
      const [active, setActive] = useState(false);
      const [hover, setHover] = useState(false);
      const [focus, setFocus] = useState(false);
      const { componentProps, variantProps } = Object.entries(props).reduce<{
        componentProps: P;
        variantProps: Props<T, P>;
      }>(
        (acc, [propsName, valueProps]) => {
          if (variantNames.includes(propsName)) {
            acc.variantProps[propsName as keyof Props<T, P>] =
              valueProps?.toString() || undefined;
          } else if (propsName !== 'className') {
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

      const extendClassName = (Component as any).styles?.(
        props as unknown as Props<T, P>
      );

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
