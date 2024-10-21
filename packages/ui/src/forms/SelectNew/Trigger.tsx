import { composeStyles, createStyles } from '@crossed/styled';
import { Floating } from '../../overlay/Floating';
import { form } from '../../styles/form';
import { ChevronDown } from '@crossed/unicons/ChevronDown';
import { useSelectAriaContext, useSelectContext } from './context';
import { XBox } from '../../layout/XBox';
import { FormLabel } from '../Form';
import { composeEventHandlers, composeRefs } from '@crossed/core';

const styles = createStyles(() => ({
  icon: {
    base: { flexShrink: 0 },
  },
  trigger: {
    base: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexShrink: 1,
      display: 'flex',
      flexBasis: 'auto',
    },
  },
}));
export const SelectTrigger = ({ children }) => {
  const { refs, label, description, extra } = useSelectContext();
  return (
    <Floating.Trigger
      ref={refs.setReference as any}
      // style={composeStyles(
      //   form.input,
      //   // error && form.inputError,
      //   styles.trigger
      //   // props.style
      // )}
    >
      {Boolean(label || description || extra) && (
        <XBox alignItems="center" space="xxs">
          {Boolean(label) && <FormLabel>{label}</FormLabel>}
          {/* {Boolean(description) && (
            <Text style={form.labelDescription}>{description}</Text>
          )}
          {Boolean(extra) && (
            <Text style={form.labelExtra} textAlign="right">
              {extra}
            </Text>
          )} */}
        </XBox>
      )}
      <XBox
        style={composeStyles(
          form.input,
          // error && form.inputError,
          styles.trigger
          // props.style
        )}
      >
        {children}
        <ChevronDown
          {...styles.icon.style()}
          color={form.placeholder.style().style.color}
        />
      </XBox>
    </Floating.Trigger>
  );
};
