import { MENU_ITEMS, formatMenu } from '@/constants/menu';
import { processOrderText } from './orderProcessor';
import { createOrder } from './api';
import { OrderItem } from '@/types';

export const MENSAJES_BOT = {
  BIENVENIDA: "¡Hola! 👋 Soy tu asistente de Sushi Master. ¿Te gustaría ver nuestro menú o realizar un pedido?",
  NO_ENTIENDO: "Disculpa, no he entendido bien. ¿Te gustaría ver nuestro menú o realizar un pedido? También puedes preguntarme por nuestras especialidades.",
  PEDIR: "¡Perfecto! Por favor, indica qué platos te gustaría pedir y la cantidad (por ejemplo: '2 California Roll' o '1 Nigiri de Salmón')",
  CONFIRMAR_PEDIDO: "Genial, he registrado tu pedido. ¿Podrías proporcionarme tu nombre y email para procesarlo? (formato: 'nombre: Juan, email: juan@ejemplo.com')",
  ERROR: "Lo siento, ha ocurrido un error. ¿Podrías intentarlo de nuevo?",
  PEDIDO_COMPLETADO: "¡Gracias! Tu pedido ha sido registrado y está siendo procesado. Te enviaremos un email con los detalles.",
  PEDIDO_NO_VALIDO: "No he podido identificar el pedido. Por favor, especifica la cantidad y el nombre del plato exactamente como aparece en el menú."
};

interface OrderState {
  items: OrderItem[];
  customerName?: string;
  customerEmail?: string;
}

let currentOrder: OrderState = {
  items: []
};

const extractCustomerInfo = (text: string) => {
  const nameMatch = text.match(/nombre:\s*([^,]+)/i);
  const emailMatch = text.match(/email:\s*([^,\s]+)/i);
  
  return {
    name: nameMatch ? nameMatch[1].trim() : null,
    email: emailMatch ? emailMatch[1].trim() : null
  };
};

export const procesarEntradaUsuario = async (entrada: string): Promise<string> => {
  const entradaLower = entrada.toLowerCase();
  
  // Mostrar menú
  if (entradaLower.includes('menú') || entradaLower.includes('menu') || entradaLower.includes('carta')) {
    currentOrder = { items: [] }; // Reset order
    return formatMenu();
  }
  
  // Iniciar pedido
  if (entradaLower.includes('pedir') || entradaLower.includes('ordenar') || entradaLower.includes('pedido')) {
    currentOrder = { items: [] }; // Reset order
    return MENSAJES_BOT.PEDIR;
  }

  // Procesar información del cliente
  if (currentOrder.items.length > 0 && !currentOrder.customerName) {
    const customerInfo = extractCustomerInfo(entrada);
    if (customerInfo.name && customerInfo.email) {
      try {
        await createOrder({
          items: currentOrder.items,
          totalAmount: currentOrder.items.reduce((total, item) => total + (item.price * item.quantity), 0),
          customerName: customerInfo.name,
          customerEmail: customerInfo.email,
          status: 'pending'
        });
        currentOrder = { items: [] }; // Reset order after successful creation
        return MENSAJES_BOT.PEDIDO_COMPLETADO;
      } catch (error) {
        return MENSAJES_BOT.ERROR;
      }
    }
    return MENSAJES_BOT.CONFIRMAR_PEDIDO;
  }

  // Procesar items del pedido
  const orderItem = processOrderText(entrada);
  if (orderItem) {
    currentOrder.items.push(orderItem);
    return `He añadido ${orderItem.quantity}x ${orderItem.name} a tu pedido. ¿Deseas algo más o quieres finalizar el pedido?`;
  }

  if (entradaLower.includes('especial') || entradaLower.includes('recomend')) {
    return `Te recomiendo nuestros platos especiales:\n\n${MENU_ITEMS.especiales.map(item => 
      `🌟 ${item.name} - ${item.price.toFixed(2)}€\n   ${item.description}`
    ).join('\n\n')}`;
  }

  return MENSAJES_BOT.NO_ENTIENDO;
};