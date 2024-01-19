/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import React, { ComponentPropsWithoutRef } from 'react';
import { Slot } from './Slot';
import { createScope, useComposedRefs } from '@crossed/core';

type SlotProps = ComponentPropsWithoutRef<typeof Slot>;
type CollectionElement = HTMLElement;
type CollectionProps = SlotProps;

// We have resorted to returning slots directly rather than exposing primitives that can then
// be slotted like `<CollectionItem as={Slot}>…</CollectionItem>`.
// This is because we encountered issues with generic types that cannot be statically analysed
// due to creating them dynamically via createCollection.

function createCollection<ItemElement extends HTMLElement, ItemData = {}>(
  name: string
) {
  /* -----------------------------------------------------------------------------------------------
   * CollectionProvider
   * ---------------------------------------------------------------------------------------------*/

  type ContextValue = {
    collectionRef: React.RefObject<CollectionElement>;
    itemMap: Map<
      React.RefObject<ItemElement>,
      { ref: React.RefObject<ItemElement> } & ItemData
    >;
  };

  const [CollectionProviderImpl, useCollectionContext] =
    createScope<ContextValue>({
      collectionRef: { current: null },
      itemMap: new Map(),
    });

  const CollectionProvider: React.FC<{
    children?: React.ReactNode;
  }> = (props) => {
    const { children } = props;
    const ref = React.useRef<CollectionElement>(null);
    const itemMap = React.useRef<ContextValue['itemMap']>(new Map()).current;

    return (
      <CollectionProviderImpl itemMap={itemMap} collectionRef={ref}>
        {children}
      </CollectionProviderImpl>
    );
  };

  CollectionProvider.displayName = 'Collection';

  /* -----------------------------------------------------------------------------------------------
   * CollectionSlot
   * ---------------------------------------------------------------------------------------------*/

  const COLLECTION_SLOT_NAME = name + 'CollectionSlot';

  const CollectionSlot = React.forwardRef<CollectionElement, CollectionProps>(
    (props, forwardedRef) => {
      const { children } = props;
      const context = useCollectionContext();
      const composedRefs = useComposedRefs(forwardedRef, context.collectionRef);
      return <Slot ref={composedRefs}>{children}</Slot>;
    }
  );

  CollectionSlot.displayName = COLLECTION_SLOT_NAME;

  /* -----------------------------------------------------------------------------------------------
   * CollectionItem
   * ---------------------------------------------------------------------------------------------*/

  const ITEM_SLOT_NAME = name + 'CollectionItemSlot';
  const ITEM_DATA_ATTR = 'data-crossed-collection-item';

  type CollectionItemSlotProps = ItemData & {
    children: React.ReactNode;
  };

  const CollectionItemSlot = React.forwardRef<
    ItemElement,
    CollectionItemSlotProps
  >((props, forwardedRef) => {
    const { children, ...itemData } = props;
    const ref = React.useRef<ItemElement>(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const context = useCollectionContext();

    React.useEffect(() => {
      context.itemMap.set(ref, { ref, ...(itemData as unknown as ItemData) });
      return () => void context.itemMap.delete(ref);
    });

    return (
      <Slot {...{ [ITEM_DATA_ATTR]: '' }} ref={composedRefs}>
        {children}
      </Slot>
    );
  });

  CollectionItemSlot.displayName = ITEM_SLOT_NAME;

  /* -----------------------------------------------------------------------------------------------
   * useCollection
   * ---------------------------------------------------------------------------------------------*/

  function useCollection() {
    const context = useCollectionContext();

    const getItems = React.useCallback(() => {
      const collectionNode = context.collectionRef.current;
      if (!collectionNode) return [];
      const orderedNodes = Array.from(
        collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`)
      );
      const items = Array.from(context.itemMap.values());
      const orderedItems = items.sort(
        (a, b) =>
          orderedNodes.indexOf(a.ref.current!) -
          orderedNodes.indexOf(b.ref.current!)
      );
      return orderedItems;
    }, [context.collectionRef, context.itemMap]);

    return getItems;
  }

  return [
    {
      Provider: CollectionProvider,
      Slot: CollectionSlot,
      ItemSlot: CollectionItemSlot,
    },
    useCollection,
  ] as const;
}

export { createCollection };
export type { CollectionProps };
