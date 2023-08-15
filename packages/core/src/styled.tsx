import 'raf/polyfill';
import type {
  ComponentType,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from 'react';
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import tw from 'twrnc';
import { Platform, StyleSheet } from 'react-native';
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
import { motify } from 'moti';
import type { Style } from 'twrnc/dist/esm/types';

export const styled = <
  P extends Record<string, any>,
  T extends ConfigSchema<P> = {}
>(
  ComponentProps: ComponentType<P> & {
    styles?: (p?: Props<T, P>) => BaseWithState<P>;
  },
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

  const Component = motify<P, any>(ComponentProps)();

  type NewComponentProps = {
    className?: string;
    animations?: boolean;
    states?: { isActive?: boolean; isFocus?: boolean; isHover?: boolean };
  } & Omit<Props<T, P>, 'className'> &
    GetProps<typeof Component>;

  const variantNames = Object.keys(
    themeConfigProps.variants || {}
  ) as (keyof T)[];

  const NewComponent = forwardRef<any, NewComponentProps>((props, ref) => {
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

    const styles = useMemo(() => {
      return stylesClass(variantProps);
    }, [JSON.stringify(variantProps)]);

    const extendClassName = useMemo(() => {
      return ComponentProps.styles?.(props as unknown as Props<T, P>);
    }, [props]);

    const baseClassName = useMemo(() => {
      return twMerge(
        extendClassName?.className,
        styles.className,
        props.className
      );
    }, [extendClassName?.className, props.className, styles.className]);

    const styleProps = useMemo(() => {
      return Platform.OS === 'web'
        ? StyleSheet.create({
            root: {
              $$css: true,
              ...baseClassName.split(' ').reduce<any>((acc, className) => {
                acc[`___${className}`] = className;
                return acc;
              }, {}),
            },
          }).root
        : tw.style(baseClassName);
    }, [baseClassName]);

    const stateRef = useRef({
      active,
      focus,
      hover,
    });

    useEffect(() => {
      stateRef.current = {
        active,
        focus,
        hover,
      };
    }, [hover, focus, active]);

    const { from, animate } = useMemo(() => {
      const {
        active: activeRef,
        focus: focusRef,
        hover: hoverRef,
      } = stateRef.current;
      let from =
        (focusRef
          ? styles[':focus']?.className
          : hoverRef
          ? styles[':hover']?.className
          : activeRef
          ? styles[':active']?.className
          : styles.className) || styles.className;
      let animate = styles.className;

      if (hover && styles[':hover']) {
        animate = styles[':hover'].className;
      }
      if (active && styles[':active']) {
        animate = styles[':active'].className;
      }
      if (focus && styles[':focus']) {
        animate = styles[':focus'].className;
      }
      if (props.disabled && styles[':disabled']) {
        animate = styles[':disabled'].className;
      }
      return {
        from: convertValueToString(tw.style(from)),
        animate: convertValueToString(tw.style(animate)),
      };
    }, [hover, active, props.disabled, focus, styles]);

    const NewComp = useMemo(() => {
      return styles.props?.as ? motify(styles.props?.as)() : Component;
    }, [styles.props?.as]);

    return (
      <NewComp
        ref={ref}
        from={from}
        animate={animate}
        transition={{
          type: 'timing',
          duration: 200,
        }}
        {...(componentProps as any)}
        style={[styleProps, convertValueToString(componentProps.style || {})]}
        onPressIn={composeEventHandlers(componentProps?.onPressIn, () => {
          setActive(true);
        })}
        onPressOut={composeEventHandlers(componentProps?.onPressIn, () => {
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
  });

  return withStaticProperties(NewComponent, {
    styles: (p?: Props<T, P>) => {
      const parentStyle = ComponentProps.styles?.(p);
      const style = stylesClass(p);
      return parentStyle ? merge(parentStyle, style) : style;
    },
  });
};

const convertValueToString = (json: Style) => {
  return Object.entries(json).reduce((acc, [key, value]) => {
    let valueTmp = value;

    if (typeof value === 'number') {
      if (
        key.startsWith('padding') ||
        ['fontSize', 'lineHeight'].includes(key)
      ) {
        valueTmp = `${value}px`;
      }
      if (
        [
          'zIndex',
          'borderRadius',
          'gap',
          'flexShrink',
          'borderWidth',
          'flexGrow',
        ].includes(key)
      ) {
        valueTmp = value.toString();
      }
    }
    return {
      ...acc,
      [key]: valueTmp,
    };
  }, {});
};
