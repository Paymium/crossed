import { GetProps, useUncontrolled, withStaticProperties } from '@crossed/core';
import { useMemo, type ComponentType, useId, useState } from 'react';
import { createSelectMain } from './Select';
import { createSelectTrigger } from './SelectTrigger';
import { createSelectContent } from './SelectContent';
import { createSelectPortal } from './SelectPortal';
import { Provider } from './context';
import { createSelectItem } from './SelectItem';
import { createSelectDivider } from './SelectDivider';
import { createSelectLabel } from './SelectLabel';
export {
  Provider as ProviderSelect,
  useContext as useSelectContext,
} from './context';

type Arg<Context extends Record<string, any>> = {
  context?: Context;
};

export const createSelect = <
  SelectProps extends Record<string, any>,
  TriggerProps extends Record<string, any>,
  ContentProps extends Record<string, any>,
  PortalProps extends Record<string, any>,
  ItemProps extends Record<string, any>,
  DividerProps extends Record<string, any>,
  LabelProps extends Record<string, any>,
  C extends Record<string, any>
>(
  components: {
    Root: ComponentType<SelectProps>;
    Trigger: ComponentType<TriggerProps>;
    Content: ComponentType<ContentProps>;
    Portal: ComponentType<PortalProps>;
    Item: ComponentType<ItemProps>;
    Divider: ComponentType<DividerProps>;
    Label: ComponentType<LabelProps>;
  },
  { context }: Arg<C> = {}
) => {
  const { Root, Trigger, Content, Portal, Item, Divider, Label } = components;
  const Select = createSelectMain(Root);
  const SelectTrigger = createSelectTrigger(Trigger);
  const SelectContent = createSelectContent(Content);
  const SelectPortal = createSelectPortal(Portal);
  const SelectItem = createSelectItem(Item);
  const SelectDivider = createSelectDivider(Divider);
  const SelectLabel = createSelectLabel(Label);

  Select.displayName = 'Select';
  SelectTrigger.displayName = 'Select.Trigger';
  SelectContent.displayName = 'Select.Content';
  SelectPortal.displayName = 'Select.Portal';
  SelectItem.displayName = 'Select.Item';
  SelectDivider.displayName = 'Select.Divider';
  SelectLabel.displayName = 'Select.Label';

  return withStaticProperties(
    (
      props: GetProps<typeof Select> & {
        value?: string;
        defaultValue?: string;
        onChange?: (_p: string) => void;
      }
    ) => {
      const id = useId();
      const {
        value: valueProps,
        defaultValue = false,
        onChange,
        ...otherProps
      } = props;
      const [open, setOpen] = useState(false);
      const [value, setVBalue] = useUncontrolled({
        value: valueProps,
        defaultValue,
        onChange,
      });

      const contextProps = useMemo(() => {
        return Object.entries(context || {}).reduce<C>((acc, [key]) => {
          if ((props as any)[key]) {
            (acc as any)[key] = (props as any)[key];
          }
          return acc;
        }, context || ({} as C));
      }, [props]);

      return (
        <Provider
          {...contextProps}
          id={id}
          open={open}
          setOpen={setOpen}
          value={value}
          setValue={setVBalue}
        >
          <Select {...(otherProps as any)} />
        </Provider>
      );
    },
    {
      Trigger: SelectTrigger,
      Content: SelectContent,
      Portal: SelectPortal,
      Item: SelectItem,
      Divider: SelectDivider,
      Label: SelectLabel,
    }
  );
};
