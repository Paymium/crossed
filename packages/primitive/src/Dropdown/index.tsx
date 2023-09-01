import { GetProps, useUncontrolled, withStaticProperties } from '@crossed/core';
import { useMemo, type ComponentType, useId } from 'react';
import { createDropdownMain } from './Dropdown';
import { createDropdownTrigger } from './DropdownTrigger';
import { createDropdownContent } from './DropdownContent';
import { createDropdownPortal } from './DropdownPortal';
import { Provider } from './context';
import { createDropdownOverlay } from './DropdownOverlay';

type Arg<Context extends Record<string, any>> = {
  context?: Context;
};

export const createDropdown = <
  DropdownProps extends Record<string, any>,
  TriggerProps extends Record<string, any>,
  ContentProps extends Record<string, any>,
  PortalProps extends Record<string, any>,
  OverlayProps extends Record<string, any>,
  C extends Record<string, any>
>(
  components: {
    Root: ComponentType<DropdownProps>;
    Trigger: ComponentType<TriggerProps>;
    Content: ComponentType<ContentProps>;
    Portal: ComponentType<PortalProps>;
    Overlay: ComponentType<OverlayProps>;
  },
  { context }: Arg<C> = {}
) => {
  const { Root, Trigger, Content, Portal, Overlay } = components;
  const Dropdown = createDropdownMain(Root);
  const DropdownTrigger = createDropdownTrigger(Trigger);
  const DropdownContent = createDropdownContent(Content);
  const DropdownPortal = createDropdownPortal(Portal);
  const DropdownOverlay = createDropdownOverlay(Overlay);

  Dropdown.displayName = 'Dropdown';
  DropdownTrigger.displayName = 'Dropdown.Trigger';
  DropdownContent.displayName = 'Dropdown.Content';
  DropdownPortal.displayName = 'Dropdown.Portal';
  DropdownOverlay.displayName = 'Dropdown.Overlay';

  return withStaticProperties(
    (
      props: GetProps<typeof Dropdown> & {
        value?: boolean;
        defaultValue?: boolean;
        onChangeOpen?: (p: boolean) => void;
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
      Overlay: DropdownOverlay,
    }
  );
};
