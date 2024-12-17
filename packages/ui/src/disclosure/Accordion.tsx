/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  composeStyles,
  createStyles,
  CrossedMethods,
  inlineStyle,
} from '@crossed/styled';
import {
  createContext,
  forwardRef,
  type MutableRefObject,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { ChevronDown } from '@crossed/unicons';
import {
  ScrollView,
  ScrollViewProps,
  View,
  type ViewProps,
} from 'react-native';
import { useUncontrolled, withStaticProperties } from '@crossed/core';
import { Floating, FloatingTriggerProps } from '../overlay/Floating';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useFloatingContext } from '../overlay/Floating/context';

const accordionStyles = createStyles((t) => ({
  root: {
    base: {
      borderBottomWidth: 1,
      borderColor: t.colors.border.primary,
      borderStyle: 'solid',
    },
  },
  trigger: {
    base: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },
  panel: {
    web: {
      base: { overflow: 'hidden', transition: 'height 170ms ease-out' },
    },
  },
  item: {
    base: {
      borderTopWidth: 1,
      borderColor: t.colors.border.primary,
      borderStyle: 'solid',
    },
    web: {
      base: { transition: 'height 1000ms ease' },
    },
  },
}));

export type AccordionProps = ViewProps & {
  allowMultiple?: boolean;
  defaultValues?: string[];
  values?: string[];
  onChange?: (_p: string[]) => void;
};

export type AccordionRootContext = Required<
  Pick<AccordionProps, 'allowMultiple' | 'values'>
> & {
  setValues: (_value: string[]) => void;
};

const rootContext = createContext<AccordionRootContext>(
  {} as AccordionRootContext
);
export type AccordionItemProps = ViewProps & { value: string };
export type ItemContext = Pick<AccordionItemProps, 'value'> & {
  buttonId: MutableRefObject<string | undefined>;
  panelId: MutableRefObject<string | undefined>;
};
const itemContext = createContext<ItemContext>({} as ItemContext);
const Root = (props: AccordionProps) => {
  const {
    children,
    allowMultiple = false,
    defaultValues,
    values: valueProps,
    onChange,
  } = props;
  const [values, setValues] = useUncontrolled({
    defaultValue: defaultValues ?? [],
    value: valueProps,
    onChange,
  });
  return (
    <rootContext.Provider value={{ values, setValues, allowMultiple }}>
      {children}
    </rootContext.Provider>
  );
};
Root.displayName = 'Accordion';

const AccordionItem = ({ children, value }: AccordionItemProps) => {
  const { setValues, values, allowMultiple } = useContext(rootContext);
  const buttonId = useRef<string>();
  const panelId = useRef<string>();
  const handleChange = useCallback(() => {
    setValues(
      allowMultiple
        ? values.includes(value)
          ? values.filter((e) => e !== value)
          : [...values, value]
        : [value]
    );
  }, [setValues, value, values, allowMultiple]);
  return (
    <itemContext.Provider value={{ value, buttonId, panelId }}>
      <Floating
        onChange={handleChange}
        value={values.includes(value)}
        removeScroll={false}
      >
        {children}
      </Floating>
    </itemContext.Provider>
  );
};
AccordionItem.displayName = 'Accordion.Item';

export type AccordionTriggerProps = FloatingTriggerProps;

const AccordionTrigger = forwardRef<View, AccordionTriggerProps>(
  ({ style, ...props }, ref) => (
    <Floating.Trigger
      {...props}
      ref={ref}
      style={composeStyles(accordionStyles.trigger, style)}
    />
  )
);
AccordionTrigger.displayName = 'Accordion.Trigger';

/**
 * AccordionPanelProps defines the properties for the AccordionPanel component.
 *
 * The AccordionPanel component is typically used within an Accordion component
 * to display a collapsible and expandable content panel. This type extends
 * React's PropsWithChildren, allowing it to include children components or elements.
 *
 * Properties:
 * @typedef {Object} AccordionPanelProps
 *
 * @property {CrossedMethods<any>} [style] - An optional style property that allows
 * for the application of custom styling methods. This style attribute can be
 * manipulated using methods defined in CrossedMethods, which might include utility
 * methods for advanced styling techniques or conditional styles based on theme
 * or state.
 */
export type AccordionPanelProps = PropsWithChildren<{
  style?: CrossedMethods<any>;
}>;
const AccordionPanel = ({ children, style }: AccordionPanelProps) => {
  const openSharedValue = useSharedValue(false);
  const { open } = useFloatingContext();
  const height = useSharedValue(0);
  const handleLayout = useCallback<
    NonNullable<ScrollViewProps['onContentSizeChange']>
  >(
    (_w, h) => {
      height.value = h;
    },
    [height]
  );

  useEffect(() => {
    openSharedValue.value = open;
  }, [open]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(openSharedValue.value ? height.value : 0),
    };
  }, [height, openSharedValue]);
  return (
    <Floating.VisibilityHidden
      animatedStyle={animatedStyle}
      style={composeStyles(
        inlineStyle(() => ({
          base: { position: 'relative' },
        })),
        style
      )}
    >
      <ScrollView onContentSizeChange={handleLayout} style={{ flex: 1 }}>
        {children}
      </ScrollView>
    </Floating.VisibilityHidden>
  );
};
AccordionPanel.displayName = 'Accordion.Panel';

const AccordionIcon = () => {
  const { value } = useContext(itemContext);
  const { values } = useContext(rootContext);
  const isOpen = values.includes(value);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: withTiming(isOpen ? '-180deg' : '0deg') }],
    };
  }, [isOpen]);
  return (
    <Animated.View style={[animatedStyle]}>
      <ChevronDown />
    </Animated.View>
  );
};
AccordionIcon.displayName = 'Accordion.Icon';

export const Accordion = withStaticProperties(Root, {
  Item: AccordionItem,
  Panel: AccordionPanel,
  Trigger: AccordionTrigger,
  Icon: AccordionIcon,
});

export { AccordionItem, AccordionPanel, AccordionTrigger, AccordionIcon };
