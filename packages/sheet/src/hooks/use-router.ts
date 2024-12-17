/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createContext, useCallback, useContext, useState } from 'react';
import { Animated } from 'react-native';
import { Sheets, ActionSheetRef } from '../types';

export type RouteDefinition<T extends {} = {}> = T;

export type Route<
  Key extends keyof Sheets = never,
  K extends keyof Sheets[Key]['routes'] = never,
> = {
  /**
   * Name of the route.
   */
  name: K | (string & {});
  /**
   * A react component that will render when this route is navigated to.
   */
  component: any;
  /**
   * Initial params for the route.
   */
  params?: Sheets[Key]['routes'][K];
};

export type Router<Key extends keyof Sheets = never> = {
  currentRoute: Route<Key>;

  /**
   * Navigate to a route
   *
   * @param name  Name of the route to navigate to
   * @param params Params to pass to the route upon navigation. These can be accessed in the route using `useSheetRouteParams` hook.
   * @param snap Snap value for navigation animation. Between -100 to 100. A positive value snaps inwards, while a negative value snaps outwards.
   */
  navigate: <RouteKey extends keyof Sheets[Key]['routes']>(
    _name: RouteKey | (string & {}),
    _params?: Sheets[Key]['routes'][RouteKey] | any,
    _snap?: number
  ) => void;
  /**
   * Navigate back from a route.
   *
   * @param name  Name of the route to navigate back to.
   * @param snap Snap value for navigation animation. Between -100 to 100. A positive value snaps inwards, while a negative value snaps outwards.
   */
  goBack: <RouteKey extends keyof Sheets[Key]['routes']>(
    _name?: RouteKey | (string & {}),
    _snap?: number
  ) => void;
  /**
   * Close the action sheet.
   */
  close: () => void;
  /**
   * Pop to top of the stack.
   */
  popToTop: () => void;
  /**
   * Whether this router has any routes registered.
   */
  hasRoutes: () => boolean | undefined;
  /**
   * Get the currently rendered stack.
   */
  stack: Route<Key>[];
  /**
   * An internal function called by sheet to navigate to initial route.
   */
  initialNavigation: () => void;
  canGoBack: () => boolean;
};

export const useRouter = ({
  onNavigate,
  onNavigateBack,
  initialRoute,
  routes,
  getRef,
  routeOpacity,
}: {
  initialRoute?: string;
  routes?: Route[];
  getRef?: () => ActionSheetRef;
  onNavigate?: (_route: string) => void;
  onNavigateBack?: (_route: string) => void;
  routeOpacity: Animated.Value;
}): Router => {
  const [stack, setStack] = useState<Route[]>([]);
  const currentRoute: Route | undefined = stack?.[stack.length - 1];

  const animate = useCallback(
    (snap = 0, opacity = 0, delay = 0) => {
      getRef?.().snapToRelativeOffset(snap);
      Animated.timing(routeOpacity, {
        toValue: opacity,
        duration: 150,
        useNativeDriver: true,
        delay: delay,
      }).start();
    },
    [getRef, routeOpacity]
  );

  const navigate = useCallback(
    (name: string, params?: any, snap?: number) => {
      animate(snap || 20, 0);
      setTimeout(() => {
        setStack((state: any) => {
          const next = routes?.find((route) => route.name === name);
          if (!next) {
            animate(0, 1);
            return state;
          }
          const currentIndex = state.findIndex(
            (route) => route.name === next.name
          );
          if (currentIndex > -1) {
            const nextStack = [...state];
            nextStack.splice(currentIndex, 1);
            return [...nextStack, { ...next, params: params || next.params }];
          }
          onNavigate?.(next.name);
          animate(0, 1, 150);
          return [...state, { ...next, params: params || next.params }];
        });
      }, 100);
    },
    [animate, routes, onNavigate]
  );

  const initialNavigation = () => {
    if (!routes) return;
    if (initialRoute) {
      const route = routes?.find((rt) => rt.name === initialRoute);
      if (route) {
        setStack([route]);
      }
    } else {
      setStack([routes[0]]);
    }
    Animated.timing(routeOpacity, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const goBack = (name?: string, snap?: number) => {
    getRef?.().snapToRelativeOffset(snap || -10);
    animate(snap || -10, 0);
    setTimeout(() => {
      setStack((state) => {
        const next = routes?.find((route) => route.name === name);
        if (state.length === 1) {
          close();
          animate(0, 1);
          return state;
        }

        if (!next) {
          const nextStack = [...state];
          nextStack.pop();
          if (currentRoute) {
            onNavigateBack?.(nextStack[nextStack.length - 1]?.name);
            animate(0, 1, 150);
          }
          return nextStack;
        }
        const currentIndex = stack.findIndex(
          (route) => route.name === next.name
        );
        if (currentIndex > -1) {
          const nextStack = [...state];
          nextStack.splice(currentIndex);
          onNavigateBack?.(nextStack[nextStack.length - 1]?.name);
          animate(0, 1, 150);
          return [...nextStack, next];
        }
        animate(0, 1, 150);
        onNavigateBack?.(next.name);
        return [...stack, next];
      });
    }, 100);
  };

  const close = () => {
    getRef?.()?.hide();
  };

  const popToTop = () => {
    if (!stack[0]) {
      return;
    }
    goBack(stack[0].name);
  };

  const canGoBack = () => {
    return stack && stack.length > 1;
  };

  return {
    currentRoute: currentRoute as unknown as Route,
    navigate: navigate as any,
    goBack: goBack as any,
    close,
    popToTop,
    hasRoutes: () => routes && routes.length > 0,
    stack,
    initialNavigation,
    canGoBack,
  };
};

export const RouterContext = createContext<Router | undefined>(undefined);
/**
 * A hook that you can use to control the router.
 */
export function useSheetRouter<SheetId extends keyof Sheets>(
  _id?: SheetId | (string & {})
): Router<SheetId> | undefined {
  return useContext(RouterContext);
}

export const RouterParamsContext = createContext<any>(undefined);
/**
 * A hook that returns the params for current navigation route.
 */
export function useSheetRouteParams<
  SheetId extends keyof Sheets = never,
  RouteKey extends keyof Sheets[SheetId]['routes'] = never,
>(
  _id?: SheetId | (string & {}),
  _routeKey?: RouteKey | (string & {})
): Sheets[SheetId]['routes'][RouteKey] {
  const context = useContext(RouterParamsContext);
  return context;
}

export type RouteScreenProps<
  SheetId extends keyof Sheets = never,
  RouteKey extends keyof Sheets[SheetId]['routes'] = never,
> = {
  router: Router<SheetId>;
  params: Sheets[SheetId]['routes'][RouteKey];
  /**
   * @deprecated use `useSheetPayload` hook.
   */
  payload: Sheets[SheetId]['beforeShowPayload'];
};
