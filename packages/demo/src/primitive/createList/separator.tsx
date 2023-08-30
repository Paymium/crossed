import { merge } from '@crossed/styled';
import { createList } from '@crossed/primitive';
import { YBox } from '@crossed/ui';
import { Fragment, useId, type HTMLAttributes } from 'react';

const List = createList({
  Root: ({ children, ...props }: HTMLAttributes<HTMLUListElement>) => {
    const id = useId();
    return (
      <ul
        {...props}
        className={merge(
          'flex flex-col border border-neutral-800 rounded-md',
          props.className
        )}
      >
        {Array.isArray(children)
          ? children.map((c, i) => {
              return (
                <Fragment key={`${id}-${i}`}>
                  {c}
                  {i + 1 !== children.length && (
                    <div className="border-t border-neutral-800" />
                  )}
                </Fragment>
              );
            })
          : children}
      </ul>
    );
  },
  Item: (props: HTMLAttributes<HTMLLIElement>) => {
    return <li {...props} className={merge('px-3 py-2', props.className)} />;
  },
  SubTitle: (props: HTMLAttributes<HTMLDivElement>) => {
    return (
      <div
        {...props}
        className={merge('text-sm text-neutral-500', props.className)}
      />
    );
  },
  Title: (props: HTMLAttributes<HTMLDivElement>) => {
    return <div {...props} className={merge('font-bold', props.className)} />;
  },
});

export const CreateListWithSeparatorDemo = () => {
  return (
    <YBox space="md">
      <List>
        <List.Item>
          <List.Title>Number 1</List.Title>
          <List.SubTitle>Description Number 1</List.SubTitle>
        </List.Item>
        <List.Item>
          <List.Title>Number 2</List.Title>
          <List.SubTitle>Description 2</List.SubTitle>
        </List.Item>
        <List.Item>
          <List.Title>Number 3</List.Title>
          <List.SubTitle>Number 3 have description</List.SubTitle>
        </List.Item>
      </List>
    </YBox>
  );
};
