/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { RefObject } from 'react';
import { actionSheetEventManager, providerRegistryStack, sheetsRegistry } from './provider';
import { BottomSheetRef, Sheets } from './types';
let baseZindex = 999;
// Array of all the ids of BottomSheets currently rendered in the app.
const ids: string[] = [];
const refs: { [name: string]: RefObject<BottomSheetRef> } = {};

/**
 * Get rendered action sheets stack
 * @returns
 */
export function getSheetStack() {
  return ids.map((id) => {
    return {
      id: id.split(':')[0],
      context: id.split(':')?.[1] || 'global',
    };
  });
}

/**
 * A function that checks whether the bottom sheet with the given id is rendered on top or not.
 * @param id
 * @param context
 * @returns
 */
export function isRenderedOnTop(id: string, context?: string) {
  return context
    ? ids[ids.length - 1] === `${id}:${context}`
    : ids[ids.length - 1].startsWith(id);
}

/**
 * Set the base zIndex upon which bottom sheets will be stacked. Should be called once in the global space.
 *
 * Default `baseZIndex` is `999`.
 *
 * @param zIndex
 */
export function setBaseZIndexForBottomSheets(zIndex: number) {
  baseZindex = zIndex;
}

/** @deprecated Use setBaseZIndexForBottomSheets instead */
export const setBaseZIndexForActionSheets = setBaseZIndexForBottomSheets;

/**
 * Since non modal based bottom sheets are stacked one above the other, they need to have
 * different zIndex for gestures to work correctly.
 * @param id
 * @param context
 * @returns
 */
export function getZIndexFromStack(id: string, context: string) {
  const index = ids.indexOf(`${id}:${context}`);
  if (index > -1) {
    return baseZindex + index + 1;
  }
  return baseZindex;
}

class _SheetManager {
  context(options?: { context?: string; id?: string }) {
    if (!options) options = {};
    if (!options?.context) {
      // If no context is provided, use to current top most context
      // to render the sheet.
      for (const context of providerRegistryStack.slice().reverse()) {
        // We only automatically select nested sheet providers.
        if (
          context.startsWith('$$-auto') &&
          !context.includes(options?.id as string)
        ) {
          options.context = context;
          break;
        }
      }
    }
    return options.context;
  }

  /**
   * Show the BottomSheet with an id.
   *
   * @param id id of the BottomSheet to show
   * @param options
   */
  async show<SheetId extends keyof Sheets>(
    id: SheetId | (string & {}),
    options?: {
      /**
       * Any data to pass to the BottomSheet. Will be available from the component `props` or in `onBeforeShow` prop on the bottom sheet.
       */
      payload?: Sheets[SheetId]['payload'];

      /**
       * Recieve payload from the Sheet when it closes
       */
      onClose?: (_data: Sheets[SheetId]['returnValue'] | undefined) => void;

      /**
       * Provide `context` of the `SheetProvider` where you want to show the bottom sheet.
       */
      context?: string;
    }
  ): Promise<Sheets[SheetId]['returnValue']> {
    return new Promise((resolve) => {
      const currentContext = this.context({
        ...options,
        id: id,
      });
      const handler = (data: any, context = 'global') => {
        if (
          context !== 'global' &&
          currentContext &&
          currentContext !== context
        )
          return;

        options?.onClose?.(data);
        sub?.unsubscribe();
        resolve(data);
      };
      const sub = actionSheetEventManager.subscribe(`onclose_${id}`, handler);

      // Check if the sheet is registered with any `SheetProviders`.
      let isRegisteredWithSheetProvider = false;
      for (const ctx in sheetsRegistry) {
        for (const _id in sheetsRegistry[ctx]) {
          if (_id === id) {
            isRegisteredWithSheetProvider = true;
          }
        }
      }
      actionSheetEventManager.publish(
        isRegisteredWithSheetProvider ? `show_wrap_${id}` : `show_${id}`,
        options?.payload,
        currentContext || 'global'
      );
    });
  }

  /**
   * An async hide function. This is useful when you want to show one BottomSheet after closing another.
   *
   * @param id id of the BottomSheet to show
   * @param data
   */
  async hide<SheetId extends keyof Sheets>(
    id: SheetId | (string & {}),
    options?: {
      /**
       * Return some data to the caller on closing the Sheet.
       */
      payload?: Sheets[SheetId]['returnValue'];
      /**
       * Provide `context` of the `SheetProvider` to hide the bottom sheet.
       */
      context?: string;
    }
  ): Promise<Sheets[SheetId]['returnValue']> {
    const currentContext = this.context({
      ...options,
      id: id,
    });
    return new Promise((resolve) => {
      let isRegisteredWithSheetProvider = false;
      // Check if the sheet is registered with any `SheetProviders`
      // and select the nearest context where sheet is registered.

      for (const _id of ids) {
        if (_id === `${id}:${currentContext}`) {
          isRegisteredWithSheetProvider = true;
          break;
        }
      }

      const hideHandler = (data: any, context = 'global') => {
        if (
          context !== 'global' &&
          currentContext &&
          currentContext !== context
        )
          return;
        sub?.unsubscribe();
        resolve(data);
      };
      const sub = actionSheetEventManager.subscribe(
        `onclose_${id}`,
        hideHandler
      );
      actionSheetEventManager.publish(
        isRegisteredWithSheetProvider ? `hide_wrap_${id}` : `hide_${id}`,
        options?.payload,
        !isRegisteredWithSheetProvider ? 'global' : currentContext
      );
    });
  }

  /**
   * Hide all the opened BottomSheets.
   *
   * @param id Hide all sheets for the specific id.
   */
  hideAll<SheetId extends keyof Sheets>(id?: SheetId | (string & {})) {
    ids.forEach((_id) => {
      if (id && !_id.startsWith(id)) return;
      actionSheetEventManager.publish(`hide_${_id.split(':')?.[0]}`);
    });
  }

  registerRef = (
    id: string,
    context: string,
    instance: RefObject<BottomSheetRef>
  ) => {
    refs[`${id}:${context}`] = instance;
  };

  /**
   *
   * Get internal ref of a sheet by the given id.
   *
   * @param id Id of the sheet
   * @param context Context in which the sheet is rendered. Normally this function returns the top most rendered sheet ref automatically.
   */
  get = <SheetId extends keyof Sheets>(
    id: SheetId | (string & {}),
    context?: string
  ): RefObject<BottomSheetRef<SheetId>> => {
    if (!context) {
      for (const ctx of providerRegistryStack.slice().reverse()) {
        for (const _id in sheetsRegistry[ctx]) {
          if (_id === id) {
            context = ctx;
            break;
          }
        }
      }
    }
    return refs[`${id}:${context}`] as RefObject<BottomSheetRef<SheetId>>;
  };

  add = (id: string, context: string) => {
    if (ids.indexOf(id) < 0) {
      ids[ids.length] = `${id}:${context}`;
    }
  };

  remove = (id: string, context: string) => {
    if (ids.indexOf(`${id}:${context}`) > -1) {
      ids.splice(ids.indexOf(`${id}:${context}`));
    }
  };
}

/**
 * SheetManager is used to imperitively show/hide any BottomSheet with a
 * unique id prop.
 */
export const SheetManager = new _SheetManager();
