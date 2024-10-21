import { MenuList } from '../../display/MenuList';
import { Floating } from '../../overlay/Floating';
import { Text } from '../../typography/Text';
import { useSelectContext } from './context';

export const SelectOption = ({ children, value }) => {
  const { setValue } = useSelectContext();
  return (
    <Floating.Trigger
      asChild
      onPress={() => {
        setValue(value);
      }}
    >
      <MenuList.Item>
        <MenuList.Title>{children}</MenuList.Title>
      </MenuList.Item>
    </Floating.Trigger>
  );
};
