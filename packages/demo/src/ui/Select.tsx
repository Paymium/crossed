import { Box, Input, Select, createScope } from '@mergeui/ui';
import type { Props } from '../props';
import { useId, useState } from 'react';
import {
  useFocusWithin,
  FocusScope,
  useKeyboard,
  useFocusManager,
} from 'react-aria';
import { UilAngleDown, UilArrowDown } from '@iconscout/react-native-unicons';

const [Provider, useContext] = createScope();

const Item = ({ title }: { title: string }) => {
  const focusManager = useFocusManager();
  const { onClose, setValue, size, variant, color, value } = useContext();
  return (
    <Input
      value={title}
      size={size}
      variant={variant}
      color={title === value ? 'blue' : color}
    >
      <Input.Label className="hidden">{title}</Input.Label>
      <Input.Content
        className="rounded-none"
        onPress={() => {
          onClose();
          setValue(title);
        }}
        onKeyPress={(e) => {
          console.log(e);
          e.preventDefault();
          switch (e.key) {
            case 'Escape':
              onClose();
              break;
            case 'ArrowDown':
              focusManager.focusNext({ wrap: true });
              break;
            case 'ArrowUp':
              focusManager.focusPrevious({ wrap: true });
              break;
            case 'Enter':
              onClose();
              setValue(title);
              break;
          }
        }}
      >
        <Input.Input
          className="cursor-pointer"
          editable={false}
          focusable={false}
        />
      </Input.Content>
    </Input>
  );
};
export const SelectDemo = ({ size, variant, color }: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const id = useId();
  const { focusWithinProps } = useFocusWithin({
    onFocusWithinChange: setOpen,
  });
  const { keyboardProps } = useKeyboard({
    onKeyDown: (e) => {
      e.preventDefault();
      (e.code === 'ArrowUp' || e.code === 'ArrowDown') && setOpen(true);
    },
  });

  return (
    <Provider
      onClose={() => setOpen(false)}
      setValue={setValue}
      size={size}
      variant={variant}
      color={color}
      value={value}
    >
      <Box className="relative">
        <Input size={size} variant={variant} color={color} value={value}>
          <Input.Content
            className="cursor-pointer"
            {...keyboardProps}
            states={{ isFocus: open }}
            onPress={() => {
              setOpen((e) => !e);
            }}
          >
            <Input.Input
              className="cursor-pointer"
              editable={false}
              selectTextOnFocus={false}
              selection={{ start: 0, end: 0 }}
            />
            <Input.Icon disabled>
              <UilAngleDown size={32} />
            </Input.Icon>
          </Input.Content>
          {open && (
            <FocusScope restoreFocus contain autoFocus>
              <div
                id="items"
                className="absolute top-full right-0 left-0  rounded-md overflow-hidden mt-2"
                {...focusWithinProps}
              >
                <Item title="First Input" />
                <Item title="Second Input" />
                <Item title="3 Input" />
                <Item title="3 Input" />
                <Item title="3 Input" />
                <Item title="3 Input" />
                <Item title="3 Input" />
                <Item title="3 Input" />
                <Item title="3 Input" />
                <Item title="3 Input" />
                <Item title="3 Input" />
                <Item title="3 Input" />
                <Item title="3 Input" />
                <Item title="3 Input" />
                <Item title="3 Input" />
              </div>
            </FocusScope>
          )}
        </Input>
      </Box>
    </Provider>
  );
  // return (
  //   <Select size={size} variant={variant as any} color={color}>
  //     <Select.Label>Size</Select.Label>
  //     <Select.Content>
  //       <Select.Option value={'xs'}>xs</Select.Option>
  //       <Select.Option value={'sm'}>sm</Select.Option>
  //       <Select.Option value={'md'}>md</Select.Option>
  //       <Select.Option value={'lg'}>lg</Select.Option>
  //       <Select.Option value={'xl'}>xl</Select.Option>
  //     </Select.Content>
  //   </Select>
  // );
};
