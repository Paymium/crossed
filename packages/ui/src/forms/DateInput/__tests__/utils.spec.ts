/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { getSeparator, getFormat, getOrderWithFormat } from '../utils';

describe('Date Utilities', () => {
  describe('getSeparator', () => {
    it('should return the separator used in French locale', () => {
      const result = getSeparator('fr');
      expect(result).toBe('/'); // Le séparateur pour "fr" devrait être un espace
    });

    it('should return the separator used in US locale', () => {
      const result = getSeparator('en-US');
      expect(result).toBe('/'); // Le séparateur pour "en-US" devrait être "/"
    });
  });

  describe('getFormat', () => {
    it('should return the date format for French locale', () => {
      const result = getFormat('fr');
      expect(result).toBe('dd-mm-yyyy');
    });

    it('should return the date format for US locale', () => {
      const result = getFormat('en-US');
      expect(result).toBe('mm-dd-yyyy');
    });
  });

  describe('getOrderWithFormat', () => {
    it('should return the correct order for French locale', () => {
      const format = 'yyyy-mm-dd';
      const result = getOrderWithFormat('fr', format);
      expect(result).toEqual(['dd', 'mm', 'yyyy']);
    });

    it('should return the correct order for US locale', () => {
      const format = 'yyyy-mm-dd';
      const result = getOrderWithFormat('en-US', format);
      expect(result).toEqual(['mm', 'dd', 'yyyy']);
    });

    it('should handle different formats correctly', () => {
      const format = 'yyyy-mm-dd';
      const result = getOrderWithFormat('en-US', format);
      expect(result).toEqual(['mm', 'dd', 'yyyy']);
    });

    it('should return an empty array for an unknown format', () => {
      const format = 'abcd';
      const result = getOrderWithFormat('en-US', format as any);
      expect(result).toEqual([]);
    });
  });
});
