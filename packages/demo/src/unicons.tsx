import { Input, Text, XBox, YBox } from '@crossed/ui';
import * as Icons from '@crossed/unicons';
import Fuse from 'fuse.js';
import { useMemo, useState } from 'react';

export const UniconsDemo = () => {
  const iconsKey = Object.keys(Icons) as (keyof typeof Icons)[];
  const [search, setSearch] = useState('');
  const fuse = useMemo(() => {
    return new Fuse(iconsKey, {});
  }, [iconsKey]);

  return (
    <YBox className="w-full">
      <Input value={search} onChangeValue={setSearch} size="lg">
        <Input.Content>
          <Input.Input placeholder="Search..." />
          {search && (
            <Input.Icon onPress={() => setSearch('')}>
              <Icons.UilTimes />
            </Input.Icon>
          )}
        </Input.Content>
      </Input>
      <XBox className="flex-wrap justify-center gap-y-10" space="xl">
        {(search ? fuse.search(search).map(({ item }) => item) : iconsKey).map(
          (name) => {
            const Icon = Icons[name];
            return (
              <YBox
                key={name}
                space="sm"
                className="basis-2/12 items-center rounded-md py-5"
              >
                <Icon size={32} />
                <Text className="dark:text-neutral-500">{name}</Text>
              </YBox>
            );
          }
        )}
      </XBox>
    </YBox>
  );
};
