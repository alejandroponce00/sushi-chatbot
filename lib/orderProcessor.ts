import { MENU_ITEMS } from '@/constants/menu';
import { OrderItem } from '@/types';

// Extraer cantidad y nombre del item del texto
export const extractOrderItem = (text: string): { quantity: number; itemName: string } | null => {
  const match = text.match(/(\d+)\s+(.+)/);
  if (!match) return null;
  
  return {
    quantity: parseInt(match[1], 10),
    itemName: match[2].trim()
  };
};

// Encontrar item en el menú
export const findMenuItem = (itemName: string) => {
  const searchName = itemName.toLowerCase();
  
  for (const category of Object.values(MENU_ITEMS)) {
    const item = category.find(
      item => item.name.toLowerCase() === searchName
    );
    if (item) return item;
  }
  
  return null;
};

// Validar y procesar el pedido
export const processOrderText = (text: string): OrderItem | null => {
  const extracted = extractOrderItem(text);
  if (!extracted) return null;

  const menuItem = findMenuItem(extracted.itemName);
  if (!menuItem) return null;

  return {
    name: menuItem.name,
    quantity: extracted.quantity,
    price: menuItem.price
  };
};