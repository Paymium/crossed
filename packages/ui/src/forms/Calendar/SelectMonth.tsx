/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { memo, useCallback } from 'react';
import { growStyles } from '../../styles';
import { Select } from '../Select';
import { YBox } from '../../layout';

interface SelectMonthProps {
  month?: number;
  onChange?: (_month: number) => void;
  months: { value: string; label: string }[];
}

export const SelectMonth = memo<SelectMonthProps>(
  ({ month, onChange, months }) => {
    const handleChange = useCallback(
      (e: string) => onChange(Number(e)),
      [onChange]
    );
    return (
      <YBox style={growStyles.on}>
        <Select
          value={month.toString()}
          onChange={handleChange}
          items={months}
        />
      </YBox>
    );
  }
);
