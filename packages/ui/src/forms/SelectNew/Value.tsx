import { Text } from '../../typography/Text';
import { useSelectContext } from './context';

export const SelectValue = () => {
  const { value } = useSelectContext();

  return <Text>{value}</Text>;
};
