import { createBadge } from '@crossed/primitive';

const Badge = createBadge({
  Text: (props: any) => {
    return (
      <span className="text-green-900 font-bold text-sm leading-3" {...props} />
    );
  },
  Root: (props: any) => {
    return <span className="bg-green-500 px-1 py-1 flex" {...props} />;
  },
});

export const CreateBadgeSimpleDemo = () => {
  return (
    <Badge>
      <Badge.Text>BADGE</Badge.Text>
    </Badge>
  );
};
