/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import { YBox, Text } from '@crossed/ui';
import { computed, effect, signal } from '@preact/signals-react';
import { useComputed, useSignals } from '@preact/signals-react/runtime';
import { cache, memo, useState, useSyncExternalStore } from 'react';
import { Pressable } from 'react-native';

export default function Toto() {
  return <List />;
}

const data = Array(6).fill(null);

const List = memo(() => {
  console.log('list render');
  return (
    <YBox>
      {data.map((a, i) => {
        const Item = createComp();
        return <Item key={i} title={i} />;
      })}
      {/* .map((a, i) => ({ title: i }))} */}
    </YBox>
  );
});

const Item = ({ title, onPointerEnter, onPointerLeave, hover }) => {
  //   const [hover, setHover] = useState(false);
  //   const onPointerEnter = () => {
  //     setHover(true);
  //   };
  //   const onPointerLeave = () => {
  //     setHover(false);
  //   };
  console.log('item render', title, hover);
  return (
    <Pressable onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
      <Text
        style={[
          { padding: 10, borderWidth: 1, borderColor: 'blue' },
          hover && { color: 'red' },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};
let listeners = [];
const createComp = () => {
  const hoverSignal = signal(false);
  const onPointerEnter = () => {
    hoverSignal.value = true;
  };
  const onPointerLeave = () => {
    hoverSignal.value = false;
  };
  const hoverStore = {
    onPointerEnter,
    onPointerLeave,
    subscribe(listener) {
      return hoverSignal.subscribe(listener);
    },
    getSnapshot() {
      return hoverSignal.value;
    },
    getServerSnahpshot() {
      return false;
    },
  };
  return (props) => {
    const hover = useSyncExternalStore(
      hoverStore.subscribe,
      hoverStore.getSnapshot,
      hoverStore.getServerSnahpshot
    );
    console.log('render', { hover });
    return (
      <Item
        {...props}
        hover={hover}
        onPointerEnter={hoverStore.enter}
        onPointerLeave={onPointerLeave}
      />
    );
  };
};
