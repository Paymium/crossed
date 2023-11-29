'use client';

import { forwardRef, useCallback, useEffect } from 'react';
import {
  withStaticProperties,
  composeEventHandlers,
  useUncontrolled,
  isWeb,
  isNative,
} from '@crossed/core';
import { crossed } from './crossed';
import type {
  NewComponentProps,
  StylableComponent,
  StyledComponent,
  Config,
  ConfigSchemaUndefined,
  StylesFunctionUndefined,
  BaseWithState,
} from '@crossed/core';
import { twMerge } from 'tailwind-merge';
import { useCrossedTheme } from './CrossedTheme';
import { default as tw } from 'twrnc';

const getFromOrderState = (
  obj: BaseWithState<any>,
  {
    active,
    hover,
    focus,
    disabled,
  }: {
    active?: boolean;
    hover?: boolean;
    focus?: boolean;
    disabled?: boolean;
  } = {},
  path = ''
) => {
  function getPath(state?: keyof BaseWithState<any>) {
    return path ? (state ? obj[state] : obj)?.[path] : state ? obj[state] : obj;
  }
  return disabled
    ? getPath(':disabled')
    : active
    ? getPath(':active')
    : hover
    ? getPath(':hover')
    : focus
    ? getPath(':focus')
    : getPath()?.className;
};

export function styled<
  P extends Record<string, any>,
  E extends StylesFunctionUndefined<any> = undefined,
  T extends ConfigSchemaUndefined<P> = undefined
>(Component: StylableComponent<P>, themeConfig: Config<P, T, E>) {
  const { extends: extendsStyle, ...themeConfigProps } = themeConfig;
  const stylesClass = crossed<T, P>(themeConfigProps);

  const stylesFunction = (
    props: any,
    tmpState: {
      disabled: boolean;
      active: boolean;
      hover: boolean;
      focus: boolean;
    },
    theme: 'dark' | 'light'
  ) => {
    const styles = stylesClass(props);
    const extendClassName =
      // TODO: remove as any
      (extendsStyle as any)?.(
        { ...themeConfig?.defaultVariants, ...props } as any,
        tmpState,
        theme
      ) || {};
    const variantExtendClassName = getFromOrderState(extendClassName, tmpState);

    const variantClassName = getFromOrderState(styles, tmpState);

    const classNameMerged = twMerge(
      extendClassName?.className,
      variantExtendClassName?.className,
      styles?.className,
      variantClassName?.className,
      props?.className
    );

    return {
      className: classNameMerged,
      as: styles.props?.as ? styles.props?.as : Component,
      props: {
        ...styles?.props,
        ...variantClassName?.props,
      },
    };
  };

  const NewComponent = forwardRef<any, NewComponentProps<T, P, E>>(
    function CrossedStyledComponent(originalProps, ref) {
      const {
        hoverTheme = true,
        activeTheme = true,
        focusTheme = true,
        ...props
      } = originalProps;
      const { theme } = useCrossedTheme();

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
      const componentProps = Object.entries(props).reduce<P>(
        (acc, [propsName, valueProps]) => {
          if (!['className', 'states'].includes(propsName)) {
            (acc as any)[propsName] = valueProps;
          }
          return acc;
        },
        {} as any
      );
      const {
        className: baseClassName,
        as,
        props: propsStyled,
      } = stylesFunction(
        props,
        {
          disabled: props.disabled,
          active: activeTheme ? active : false,
          hover: hoverTheme ? hover : false,
          focus: focusTheme ? focus : false,
        },
        theme
      );

      const isAsString = typeof as === 'string';
      const NewComp = isAsString && isNative ? Component : as ?? Component;
      const isNewCompString = typeof NewComp === 'string';

      const handlePointerUp = useCallback(() => setActive(false), []);
      const handlePointerDown = useCallback(() => setActive(true), []);
      const handlePointerEnter = useCallback(() => setHover(true), []);
      const handlePointerLeave = useCallback(() => setHover(false), []);

      useEffect(() => {
        if (isWeb && !hover && active) {
          window.document.body.addEventListener('mouseup', handlePointerUp);
          return () => {
            window.document.body.removeEventListener(
              'mouseup',
              handlePointerUp
            );
          };
        }
        return () => {};
      }, [hover, active]);

      if (isNative && isNewCompString) {
        throw new Error(
          "@crossed/styled try render string component (like 'a') in native environment"
        );
      }

      return (
        <NewComp
          ref={ref}
          {...propsStyled}
          {...parsedPropsProperty(componentProps)}
          {...(isAsString ? { className: baseClassName } : {})}
          style={[
            isWeb &&
              !isAsString && {
                $$css: true,
                [`${baseClassName}`]: baseClassName,
              },
            isNative && tw.style(baseClassName),
            ...(Array.isArray(componentProps.style)
              ? componentProps.style
              : [componentProps.style]),
            componentProps.style,
          ].filter(Boolean)}
          onMouseDown={composeEventHandlers(
            componentProps?.onMouseDown,
            handlePointerDown
          )}
          onMouseUp={composeEventHandlers(
            componentProps?.onMouseUp,
            handlePointerUp
          )}
          onMouseEnter={composeEventHandlers(
            componentProps?.onMouseEnter,
            handlePointerEnter
          )}
          onMouseLeave={composeEventHandlers(
            componentProps?.onMouseLeave,
            handlePointerLeave
          )}
          onHoverIn={composeEventHandlers(
            componentProps?.onHoverIn,
            handlePointerEnter
          )}
          onHoverOut={composeEventHandlers(
            componentProps?.onHoverOut,
            handlePointerLeave
          )}
          onPressIn={composeEventHandlers(
            componentProps?.onPressIn,
            handlePointerDown
          )}
          onPressOut={composeEventHandlers(
            componentProps?.onPressOut,
            handlePointerUp
          )}
          onBlur={composeEventHandlers(componentProps?.onBlur, () =>
            setFocus(false)
          )}
          onFocus={composeEventHandlers(componentProps?.onFocus, () =>
            setFocus(true)
          )}
        />
      );
    }
  );

  return withStaticProperties(NewComponent, {
    styles: stylesFunction,
  }) as unknown as StyledComponent<T, P, E>;
}

const parsedPropsProperty = (props: Record<string, unknown>) => {
  return Object.entries(props).reduce<Record<string, unknown>>(
    (acc, [key, value]) => {
      if (typeof value === 'string' && value.startsWith('$')) {
        acc[key] = tw.color(value.replace('$', ''));
      } else {
        acc[key] = value;
      }
      return acc;
    },
    {}
  );
};
