import { GetProps, useUncontrolled, withStaticProperties } from '@crossed/core';
import { useMemo, type ComponentType, useId } from 'react';
import { createDropdownMain } from './Dropdown';
import { createDropdownTrigger } from './DropdownTrigger';
import { createDropdownContent } from './DropdownContent';
import { createDropdownPortal } from './DropdownPortal';
import { Provider } from './context';
import { createDropdownItem } from './DropdownItem';
import { createDropdownDivider } from './DropdownDivider';
import { createDropdownLabel } from './DropdownLabel';

export {
  Provider as ProviderDropdown,
  useContext as useDropdownContext,
} from './context';

type Arg<Context extends Record<string, any>> = {
  context?: Context;
};

export const createDropdown = <
  DropdownProps extends Record<string, any>,
  TriggerProps extends Record<string, any>,
  ContentProps extends Record<string, any>,
  PortalProps extends Record<string, any>,
  ItemProps extends Record<string, any>,
  DividerProps extends Record<string, any>,
  LabelProps extends Record<string, any>,
  C extends Record<string, any>
>(
  components: {
    Root: ComponentType<DropdownProps>;
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
  const Dropdown = createDropdownMain(Root);
  const DropdownTrigger = createDropdownTrigger(Trigger);
  const DropdownContent = createDropdownContent(Content);
  const DropdownPortal = createDropdownPortal(Portal);
  const DropdownItem = createDropdownItem(Item);
  const DropdownDivider = createDropdownDivider(Divider);
  const DropdownLabel = createDropdownLabel(Label);

  Dropdown.displayName = 'Dropdown';
  DropdownTrigger.displayName = 'Dropdown.Trigger';
  DropdownContent.displayName = 'Dropdown.Content';
  DropdownPortal.displayName = 'Dropdown.Portal';
  DropdownItem.displayName = 'Dropdown.Item';
  DropdownDivider.displayName = 'Dropdown.Divider';
  DropdownLabel.displayName = 'Dropdown.Label';

  return withStaticProperties(
    (
      props: GetProps<typeof Dropdown> & {
        value?: boolean;
        defaultValue?: boolean;
        onChangeOpen?: (_p: boolean) => void;
      }
    ) => {
      const id = useId();
      const {
        value,
        defaultValue = false,
        onChangeOpen,
        ...otherProps
      } = props;
      const [open, setOpen] = useUncontrolled({
        value,
        defaultValue,
        onChange: onChangeOpen,
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
        <Provider {...contextProps} id={id} open={open} setOpen={setOpen}>
          <Dropdown {...(otherProps as any)} />
        </Provider>
      );
    },
    {
      Trigger: DropdownTrigger,
      Content: DropdownContent,
      Portal: DropdownPortal,
      Item: DropdownItem,
      Divider: DropdownDivider,
      Label: DropdownLabel,
    }
  );
};
