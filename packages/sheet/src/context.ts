/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { RefObject } from 'react';

export type ContentSize = { w: number; h: number };
export type LayoutRect = {
  w: number;
  h: number;
  x: number;
  y: number;
  px: number;
  py: number;
};

export type DraggableNodeOptions = {
  hasRefreshControl?: boolean;
  refreshControlBoundary: number;
};

export type NodesRef = {
  offset: RefObject<{ x: number; y: number }>;
  ref: RefObject<any>;
  rect: RefObject<LayoutRect>;
  handlerConfig: DraggableNodeOptions;
}[];

export type DraggableNodes = {
  nodes: RefObject<NodesRef>;
};

