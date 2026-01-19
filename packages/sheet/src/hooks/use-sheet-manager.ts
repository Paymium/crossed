/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useEffect, useState } from 'react';
import { actionSheetEventManager } from '../provider';
import { useProviderContext } from '../provider';

const useSheetManager = ({
  id,
  onHide,
  onBeforeShow,
  onContextUpdate,
}: {
  id?: string;
  onHide: (_data?: any) => void;
  onBeforeShow?: (_data?: any) => void;
  onContextUpdate: () => void;
}) => {
  const [visible, setVisible] = useState(false);
  const currentContext = useProviderContext();

  useEffect(() => {
    if (!id) return undefined;

    const subscriptions = [
      actionSheetEventManager.subscribe(
        `show_${id}`,
        (data: any, context?: string) => {
          if (currentContext !== context) return;
          if (visible) return;
          onContextUpdate?.();
          onBeforeShow?.(data);
          setVisible(true);
        }
      ),
      actionSheetEventManager.subscribe(`hide_${id}`, (data: any, context) => {
        if (currentContext !== context) return;
        onHide?.(data);
      }),
    ];
    return () => {
      subscriptions.forEach((s) => s?.unsubscribe?.());
    };
  }, [id, onHide, onBeforeShow, onContextUpdate, visible, currentContext]);

  return {
    visible,
    setVisible,
  };
};

export default useSheetManager;
