import type {
  Base,
  BaseWithState,
  ConfigSchema,
  ConfigSchemaTheme,
  Props,
  State,
  StateName,
} from './types';

export const extractState = <P, T extends ConfigSchema<P>>(
  themeConfigProps: ConfigSchemaTheme<P, T>,
  variantProps: Props<T>,
  keyProperty: keyof Pick<Base<P>, 'animate' | 'className'>,
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
  const { variants, compoundVariants = [], defaultVariants } = themeConfigProps;

  const compounedVariant = compoundVariants?.reduce<{
    [key in keyof Required<State<P>>]: string[];
  }>(
    (
      acc,
      {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        'className': cvClassName,
        'animate': _animate,
        ':active': _activeCompoundVariant,
        ':hover': _hoverCompoundVariant,
        ':focus': _focusCompoundVariant,
        ':disabled': _disabledCompoundVariant,
        ...compoundVariantOptions
      }
    ) => {
      return Object.entries(compoundVariantOptions).every(([key, value]) =>
        Array.isArray(value)
          ? value.includes(
              {
                ...defaultVariants,
                ...variantProps,
              }[key]
            )
          : {
              ...defaultVariants,
              ...variantProps,
            }[key] === value
      )
        ? {
            ':active': [
              ...acc[':active'],
              ...(_activeCompoundVariant?.[keyProperty] || []),
            ],
            ':hover': [
              ...acc[':hover'],
              ...(_hoverCompoundVariant?.[keyProperty] || []),
            ],
            ':focus': [
              ...acc[':focus'],
              ...(_focusCompoundVariant?.[keyProperty] || []),
            ],
            ':disabled': [
              ...acc[':disabled'],
              ...(_disabledCompoundVariant?.[keyProperty] || []),
            ],
          }
        : acc;
    },
    {
      ':active': [],
      ':hover': [],
      ':focus': [],
      ':disabled': [],
    }
  );
  const result = Object.entries(variantProps).reduce<{
    [key in StateName]: string[];
  }>(
    (acc, [keyVariant, valueVariant]) => {
      if (valueVariant !== undefined && valueVariant !== null) {
        const variantList = (variants as T)[keyVariant];

        const {
          ':active': _activeCompoundVariant,
          ':hover': _hoverCompoundVariant,
          ':focus': _focusCompoundVariant,
          ':disabled': _disabledCompoundVariant,
        } = compounedVariant;

        const {
          ':active': _active,
          ':hover': _hover,
          ':focus': _focus,
          ':disabled': _disabled,
        } = (variantList[valueVariant.toString()] ||
          {}) satisfies BaseWithState<P>;

        acc.active = [
          ...acc.active,
          ...(_active?.[keyProperty] || []),
          ...(_activeCompoundVariant || []),
        ];

        acc.hover = [
          ...acc.hover,
          ...(_hover?.[keyProperty] || []),
          ...(_hoverCompoundVariant || []),
        ];

        acc.focus = [
          ...acc.focus,
          ...(_focus?.[keyProperty] || []),
          ...(_focusCompoundVariant || []),
        ];

        acc.disabled = [
          ...acc.disabled,
          ...(_disabled?.[keyProperty] || []),
          ...(_disabledCompoundVariant || []),
        ];
      }
      return acc;
    },
    {
      active: activeTheme?.[keyProperty] || [],
      hover: hoverTheme?.[keyProperty] || [],
      focus: focusTheme?.[keyProperty] || [],
      disabled: disabledTheme?.[keyProperty] || [],
    }
  );

  return result;
};
