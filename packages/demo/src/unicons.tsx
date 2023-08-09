import { Text, XBox, YBox } from '@mergeui/ui';
import * as Icons from '@mergeui/unicons';
export const UniconsDemo = () => {
  const iconsKey = Object.keys(Icons) as (keyof typeof Icons)[];

  return (
    <XBox className="flex-wrap justify-center gap-y-10" space="xl">
      {iconsKey.map((name) => {
        const Icon = Icons[name];
        return (
          <YBox
            key={name}
            space="sm"
            className="basis-2/12 items-center rounded-md py-5"
          >
            <Icon size={32} />
            <Text className="dark:text-zinc-600">{name}</Text>
          </YBox>
        );
      })}
    </XBox>
  );
};
