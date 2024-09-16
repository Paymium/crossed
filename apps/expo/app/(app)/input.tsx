/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

// import { YBox, Label, Input } from '@crossed/ui';
// import { createStyles } from '@crossed/styled';
// import { FlatList } from 'react-native';
// import { useInteraction } from '@crossed/styled/plugins';

// const styles = createStyles(() => ({
//   scrollview: { base: { paddingHorizontal: 10, paddingVertical: 10 } },
//   between: {
//     base: {
//       width: '100%',
//       justifyContent: 'space-between',
//     },
//   },
//   end: { base: { alignSelt: 'flex-end', flexDirection: 'row' } },
// }));

// const states = [
//   { title: 'Default', props: {} },
//   { title: 'Hover', props: { hover: true } },
//   { title: 'Focus', props: { focus: true } },
//   { title: 'Disabled', props: { disabled: true } },
//   { title: 'Error', props: { error: true } },
// ];

export default function TabOneScreen() {
  return null;
  // const { state, props } = useInteraction();
  // return (
  //   <FlatList
  //     contentContainerStyle={styles.scrollview.rnw().style}
  //     data={states}
  //     ListHeaderComponent={
  //       <>
  //         <Label {...state} {...props}>
  //           Label
  //         </Label>
  //         <Input {...state} {...props} placeholder="Placeholder" />
  //       </>
  //     }
  //     ItemSeparatorComponent={() => <YBox style={{ height: 5 }} />}
  //     renderItem={({ item: { title, props } }) => (
  //       <YBox {...styles.between.rnw()} key={`${title}`} space="xs">
  //         <Label weight="semibold" {...props}>
  //           {title}
  //         </Label>
  //         <Input {...props} placeholder="Placeholder" />
  //         <Input {...props} value={'Type something'} />
  //       </YBox>
  //     )}
  //   />
  // );
}
