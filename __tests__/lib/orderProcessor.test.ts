import { describe, expect, it } from 'vitest';
import { extractOrderItem, findMenuItem, processOrderText } from '@/lib/orderProcessor';

describe('orderProcessor', () => {
  describe('extractOrderItem', () => {
    it('should extract quantity and item name from text', () => {
      const result = extractOrderItem('2 California Roll');
      expect(result).toEqual({
        quantity: 2,
        itemName: 'California Roll'
      });
    });

    it('should return null for invalid format', () => {
      const result = extractOrderItem('California Roll');
      expect(result).toBeNull();
    });
  });

  describe('findMenuItem', () => {
    it('should find menu item by name', () => {
      const result = findMenuItem('California Roll');
      expect(result).toMatchObject({
        name: 'California Roll',
        price: 8.50
      });
    });

    it('should return null for non-existent item', () => {
      const result = findMenuItem('Invalid Item');
      expect(result).toBeNull();
    });
  });

  describe('processOrderText', () => {
    it('should process valid order text', () => {
      const result = processOrderText('2 California Roll');
      expect(result).toMatchObject({
        name: 'California Roll',
        quantity: 2,
        price: 8.50
      });
    });

    it('should return null for invalid order text', () => {
      const result = processOrderText('invalid order');
      expect(result).toBeNull();
    });
  });
});