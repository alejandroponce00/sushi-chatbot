export interface SushiItem {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  items: OrderItem[];
  totalAmount: number;
  customerName: string;
  customerEmail: string;
  status: 'pendiente' | 'confirmado' | 'completado';
  createdAt: Date;
}

export interface Message {
  text: string;
  isBot: boolean;
}