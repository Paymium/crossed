export const TableCss = ({
  items,
}: {
  items: { key: string; css: string }[];
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Key</th>
          <th>CSS</th>
        </tr>
      </thead>
      <tbody>
        {items.map(({ key, css }) => (
          <tr key={`${key}${css}`}>
            <td>{key}</td>
            <td>{css}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
