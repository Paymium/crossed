import { createScope, withStaticProperties } from '@mergeui/core';
import { SelectRoot } from './Root';
import { SelectOption } from './Option';
import { Label } from '../forms/Label';
import type { GetProps } from '../types';

const [Provider, useContext] = createScope<{
  size?: GetProps<typeof SelectRoot>['size'];
  color?: GetProps<typeof SelectRoot>['color'];
  variant?: GetProps<typeof SelectRoot>['variant'];
  value?: string;
  onChangeValue?: (e: string) => void;
}>({ size: 'md' });

export const Select = withStaticProperties(
  ({
    size,
    value,
    variant,
    color,
    onChangeValue,
    ...props
  }: GetProps<typeof Label> & {
    size?: GetProps<typeof SelectRoot>['size'];
    color?: GetProps<typeof SelectRoot>['color'];
    variant?: GetProps<typeof SelectRoot>['variant'];
    value?: string;
    onChangeValue?: (e: string) => void;
  }) => (
    <Provider
      size={size}
      value={value}
      color={color}
      onChangeValue={onChangeValue}
      variant={variant}
    >
      <Label {...props} />
    </Provider>
  ),
  {
    Label: Label.Text,
    Content: (props: GetProps<typeof SelectRoot>) => {
      const { value, onChangeValue, size, variant, color } = useContext();
      return (
        <Label.Input>
          <SelectRoot
            size={size}
            variant={variant}
            color={color}
            {...props}
            // @ts-ignore
            value={value}
            onChange={(e: any) => onChangeValue?.(e.target.value)}
          />
        </Label.Input>
      );
    },
    Option: ({
      value: _v,
      ...props
    }: GetProps<typeof SelectOption> & { value?: string }) => (
      <SelectOption {...props} />
    ),
  }
);
