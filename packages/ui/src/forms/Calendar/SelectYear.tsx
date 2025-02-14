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

interface SelectYear {
  year?: number;
  years: number[];
  onChange?: (_year: number) => void;
}
export const SelectYear = memo(({ year, years, onChange }: SelectYear) => {
  const handleChange = useCallback(
    (e: string) => onChange(Number(e)),
    [onChange]
  );
  return (
    <YBox style={growStyles.on}>
      <Select
        value={`${year}`}
        onChange={handleChange}
        items={years.map((m) => ({
          value: `${m}`,
          label: m,
        }))}
      />
    </YBox>
  );
});
