import { Table as NTable, Tr, Td, Th } from 'nextra/components';

export const Table = ({
  props,
}: {
  props: [string, string, string, string][];
}) => {
  return (
    <NTable className="table-auto overflow-hidden w-full">
      <thead>
        <Tr>
          <Th>Props</Th>
          <Th>Type</Th>
          <Th>default</Th>
          <Th>Description</Th>
        </Tr>
      </thead>
      <tbody>
        {props.map(([name, type, defaultValue, description]) => {
          return (
            <Tr key={name}>
              <Td>{name}</Td>
              <Td className="text-center">{type}</Td>
              <Td className="text-center">{defaultValue}</Td>
              <Td>{description}</Td>
            </Tr>
          );
        })}
      </tbody>
    </NTable>
  );
};
