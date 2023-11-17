'use client';

import { forwardRef, useCallback, useEffect } from 'react';
import { Platform } from 'react-native';
import {
  withStaticProperties,
  composeEventHandlers,
  useUncontrolled,
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
    ? getPath(':disabled')?.className
    : active
    ? getPath(':active')?.className
    : hover
    ? getPath(':hover')?.className
    : focus
    ? getPath(':focus')?.className
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

    const variantExtendThemeClassName = getFromOrderState(
      extendClassName,
      tmpState,
      `:${theme}`
    );

    const variantClassName = getFromOrderState(styles, tmpState);
    const variantThemeClassName = getFromOrderState(
      styles,
      tmpState,
      `:${theme}`
    );

    const classNameMerged = twMerge(
      extendClassName?.className,
      extendClassName?.[`:${theme}`]?.className,
      variantExtendClassName,
      variantExtendThemeClassName,
      styles.className,
      styles?.[`:${theme}`]?.className,
      variantClassName,
      variantThemeClassName,
      props?.className,
      theme === 'dark' ? props?.$dark?.className : props?.$light?.className
    );

    return {
      className: classNameMerged,
      as: styles.props?.as ? styles.props?.as : Component,
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
          if (!['className', 'states', '$dark', '$light'].includes(propsName)) {
            (acc as any)[propsName] = valueProps;
          }
          return acc;
        },
        {} as any
      );
      const { className: baseClassName, as } = stylesFunction(
        props,
        {
          disabled: props.disabled,
          active: hoverTheme ? active : false,
          hover: activeTheme ? hover : false,
          focus: focusTheme ? focus : false,
        },
        theme
      );

      const NewComp = as ?? Component;

      const handleMouseUp = useCallback(() => {
        setActive(false);
      }, []);

      useEffect(() => {
        if (Platform.OS === 'web' && !hover && active) {
          window.document.body.addEventListener('mouseup', handleMouseUp);
          return () => {
            window.document.body.removeEventListener('mouseup', handleMouseUp);
          };
        }
        return () => {};
      }, [hover, active]);

      return (
        <NewComp
          ref={ref}
          {...parsedPropsProperty(componentProps)}
          dataSet={{
            ...componentProps.dataSet,
            className: baseClassName,
          }}
          className={baseClassName}
          style={[
            ['ios', 'android'].includes(Platform.OS) && tw.style(baseClassName),
            ...(Array.isArray(componentProps.style)
              ? componentProps.style
              : [componentProps.style]),
            componentProps.style,
          ].filter(Boolean)}
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
