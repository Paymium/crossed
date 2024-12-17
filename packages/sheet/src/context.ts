/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createContext, createRef, RefObject, useContext } from 'react';
import { actionSheetEventManager } from './eventmanager';

export type ContentSize = { w: number; h: number };
export type LayoutRect = {
  w: number;
  h: number;
  x: number;
  y: number;
  px: number;
  py: number;
};

export const PanGestureRefContext = createContext({
  ref: createRef(),
  eventManager: actionSheetEventManager,
});

export type DraggableNodeOptions = {
  hasRefreshControl?: boolean;
  refreshControlBoundary: number;
};

export const usePanGestureContext = () => useContext(PanGestureRefContext);

export type NodesRef = {
  offset: RefObject<{ x: number; y: number }>;
  ref: RefObject<any>;
  rect: RefObject<LayoutRect>;
  handlerConfig: DraggableNodeOptions;
}[];

export type DraggableNodes = {
  nodes: RefObject<NodesRef>;
};

export const DraggableNodesContext = createContext<DraggableNodes>({
  nodes: createRef<NodesRef>(),
});

export const useDraggableNodesContext = () => useContext(DraggableNodesContext);
