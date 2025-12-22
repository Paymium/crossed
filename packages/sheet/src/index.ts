/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import ActionSheet from './BottomSheet';

// Re-export BottomSheetModalProvider for users who need to wrap their app
export { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export {
  SheetManager,
  setBaseZIndexForBottomSheets,
  getSheetStack,
  isRenderedOnTop,
  // Backwards compatibility - deprecated
  setBaseZIndexForActionSheets,
} from './sheetmanager';
export {
  registerSheet,
  type SheetProps,
  SheetProvider,
  useProviderContext,
  useSheetIDContext,
  useSheetRef,
  useSheetPayload,
} from './provider';
export {
  type BottomSheetProps,
  type BottomSheetRef,
  type SheetDefinition,
  type Sheets,
  // Backwards compatibility - deprecated
  type ActionSheetProps,
  type ActionSheetRef,
} from './types';
export { useScrollHandlers } from './hooks/use-scroll-handlers';
export {
  useSheetRouter,
  useSheetRouteParams,
  type Route,
  type RouteScreenProps,
  type Router,
  type RouteDefinition,
} from './hooks/use-router';
export { ScrollView } from './views/ScrollView';
export { FlatList } from './views/FlatList';
export { SectionList } from './views/SectionList';
export { FlashList } from './views/FlashList';
export default ActionSheet;
