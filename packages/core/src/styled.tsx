import 'raf/polyfill';
import type { ComponentType } from 'react';
import { forwardRef, useMemo, useState } from 'react';
import { mergeui, merge } from '@mergeui/class-variance-authority';
import type { ConfigSchema as ConfigSchemaCVA } from '@mergeui/class-variance-authority';
import tw from 'twrnc';
import { Platform, StyleSheet } from 'react-native';
import type { ClassValue } from '@mergeui/class-variance-authority/src/types';
import type { Base, ConfigSchema, ConfigSchemaTheme, Props } from './types';
import { withStaticProperties } from './withStaticProperties';
import type { MotiPressableProp } from 'moti/interactions';
import { extractState } from './extractPropertyState';
import { composeEventHandlers } from './composeEventHandlers';

const camelToSnakeCase = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

const cleanForMergeui = <P, T extends ConfigSchema<P>>(
  variantsDeclaration?: ConfigSchemaTheme<P, T>
) => {
  if (!variantsDeclaration) {
    return {};
  }

  const {
    className: base,
    variants,
    defaultVariants,
    compoundVariants,
  } = variantsDeclaration;

  const config: any = {
    defaultVariants,
  };

  if (variants) {
    config.variants = Object.entries(variants).reduce<ConfigSchemaCVA>(
      (acc, [variantKey, variantValues]) => {
        const variantListT = Object.entries(variantValues).reduce<
          Record<string, ClassValue>
        >((acc2, [keyInVar, value]) => {
          acc2[keyInVar] = value.animate || value.className;
          return acc2;
        }, {});
        acc[variantKey] = variantListT;
        return acc;
      },
      {}
    );
  }

  if (compoundVariants) {
    config.compoundVariants = compoundVariants.map((compoundVariant) => {
      const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        props,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ':active': active,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ':focus': focus,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ':hover': hover,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ':pressed': pressed,
        className,
        ...other
      } = compoundVariant;
      return {
        ...other,
        className,
      };
    });
  }

  return { base, config };
};

const useExtractStateClassName = <P, T extends ConfigSchema<P>>(
  themeConfigProps: ConfigSchemaTheme<P, T>,
  variantProps: Props<T>,
  {
    activeTheme,
    hoverTheme,
    focusTheme,
    disabledTheme,
  }: {
    activeTheme?: Base<P>;
    hoverTheme?: Base<P>;
    focusTheme?: Base<P>;
    disabledTheme?: Base<P>;
  } = {}
) => {
  const {
    active: activeClassname,
    hover: hoverClassname,
    focus: focusClassname,
    disabled: disabledClassname,
  } = extractState(themeConfigProps, variantProps, 'className', {
    activeTheme,
    hoverTheme,
    focusTheme,
    disabledTheme,
  });

  return {
    activeClassname,
    hoverClassname,
    focusClassname,
    disabledClassname,
  };
};

export const styled = <
  P extends Record<string, any> = {},
  T extends ConfigSchema<P> = {}
>(
  Component: ComponentType<P> & { styles?: any },
  themeConfigProps: ConfigSchemaTheme<P, T>
) => {
  const {
    'props': propsTheme,
    ':active': activeTheme,
    ':focus': focusTheme,
    ':hover': hoverTheme,
    ':disabled': disabledTheme,
    ...themeConfig
  } = themeConfigProps || {};
  // const { as: asTheme, ...propsTheme } = props || {};
  const variants = themeConfig?.variants || {};
  const isMotiComponent = (Component as any).render?.name.startsWith('Moti');

  const { base, config } = cleanForMergeui<P, T>(themeConfigProps);
  const stylesClass = mergeui<T>(base, config) as (props?: Props<T>) => string;

  const NewComponent = forwardRef<
    any,
    {
      className?: string;
      animations?: boolean;
      states?: { isActive?: boolean; isFocus?: boolean; isHover?: boolean };
    } & P &
      Props<T>
  >((props, ref) => {
    const { className, disabled, states } = props;
    const [active, setActive] = useState(false);
    const [hover, setHover] = useState(false);
    const [focus, setFocus] = useState(false);

    const variantNames = Object.keys(variants) as (keyof T)[];
    const { componentProps, variantProps } = Object.entries(props).reduce<{
      componentProps: P;
      variantProps: Props<T>;
    }>(
      (acc, [propsName, valueProps]) => {
        if (variantNames.includes(propsName)) {
          acc.variantProps[propsName as keyof Props<T>] =
            valueProps?.toString() || undefined;
        } else {
          (acc.componentProps as any)[propsName] = valueProps;
        }
        return acc;
      },
      {
        componentProps: {},
        variantProps: themeConfig?.defaultVariants || {},
      } as any
    );

    const {
      activeClassname = [],
      hoverClassname = [],
      focusClassname = [],
      disabledClassname = [],
    } = useExtractStateClassName(themeConfigProps, variantProps, {
      activeTheme,
      focusTheme,
      hoverTheme,
      disabledTheme,
    });

    const {
      active: activeAnimate = [],
      hover: hoverAnimate = [],
      focus: focusAnimate = [],
      disabled: disabledAnimate = [],
    } = extractState(themeConfigProps, variantProps, 'animate', {
      activeTheme,
      hoverTheme,
      focusTheme,
      disabledTheme,
    });

    const hasAnimate =
      [...hoverAnimate, ...activeAnimate, ...disabledAnimate, ...focusAnimate]
        .length > 0;

    const extendClassName = useMemo(() => {
      return Component.styles?.(props);
    }, [props]);

    const baseClassName = useMemo(() => {
      return merge(extendClassName, stylesClass(props).split(' '), className);
    }, [extendClassName, props, className]);

    const finalClassName = useMemo(() => {
      return merge(
        baseClassName,
        ...(states?.isFocus || focus ? focusClassname : []),
        ...(states?.isHover || hover ? hoverClassname : []),
        ...(states?.isActive || active ? activeClassname : []),
        ...(disabled ? disabledClassname : []),
        ...(isMotiComponent
          ? []
          : [
              ...focusAnimate,
              ...hoverAnimate,
              ...activeAnimate,
              ...disabledAnimate,
            ].map((key) => {
              const property = tw.style(key);
              const [p] = Object.keys(property);
              const propertyT = camelToSnakeCase(p);
              return `transition-[${propertyT}]`;
            })),
        ...(!isMotiComponent && (states?.isFocus || focus) ? focusAnimate : []),
        ...(!isMotiComponent && (states?.isHover || hover) ? hoverAnimate : []),
        ...(!isMotiComponent && (states?.isActive || active)
          ? activeAnimate
          : []),
        ...(!isMotiComponent && disabled ? disabledAnimate : [])
      );
    }, [
      baseClassName,
      states?.isFocus,
      states?.isHover,
      states?.isActive,
      focus,
      focusClassname,
      hover,
      hoverClassname,
      active,
      activeClassname,
      disabled,
      disabledClassname,
      focusAnimate,
      hoverAnimate,
      activeAnimate,
      disabledAnimate,
    ]);

    const animate = useMemo<MotiPressableProp>(
      () =>
        !hasAnimate
          ? undefined
          : ({ hovered, pressed }) => {
              'worklet';
              const classNameAnimate = merge(
                baseClassName,
                ...(focus ? focusAnimate : []),
                ...(hovered ? hoverAnimate : []),
                ...(pressed ? activeAnimate : []),
                ...(disabled ? disabledAnimate : [])
              );
              const resultStyle = tw.style(classNameAnimate);

              const resultString = Object.entries(resultStyle).reduce(
                (acc, [key, value]) => {
                  return {
                    ...acc,
                    [key]: value.toString(),
                  };
                },
                {}
              );
              return resultString;
            },
      [
        baseClassName,
        hasAnimate,
        hoverAnimate,
        activeAnimate,
        disabled,
        disabledAnimate,
        focus,
        focusAnimate,
      ]
    );

    const propsTmp = useMemo(() => {
      return Platform.OS === 'web'
        ? {
            style: StyleSheet.create({
              root: {
                $$css: true,
                ...finalClassName.split(' ').reduce<any>((acc, className) => {
                  acc[`___${className}`] = className;
                  return acc;
                }, {}),
              },
            }).root,
          }
        : { style: tw.style(finalClassName) };
    }, [finalClassName]);

    const motiCompatibleProps = isMotiComponent ? { animate } : {};

    return (
      <Component
        ref={ref}
        {...propsTmp}
        {...componentProps}
        {...motiCompatibleProps}
        {...propsTheme}
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
    styles: (p?: Props<T>) =>
      merge((Component as any).styles?.(p), stylesClass(p)),
  });
};
