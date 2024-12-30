import { describe, expect, it, vi } from 'vitest';
import { procesarEntradaUsuario, MENSAJES_BOT } from '@/lib/chatbot';
import { createOrder } from '@/lib/api';

// Mock the API calls
vi.mock('@/lib/api', () => ({
  createOrder: vi.fn()
}));

describe('chatbot', () => {
  it('should return menu when requested', async () => {
    const response = await procesarEntradaUsuario('quiero ver el menú');
    expect(response).toContain('Nuestro Menú');
    expect(response).toContain('ROLLS');
    expect(response).toContain('NIGIRI');
  });

  it('should process order request', async () => {
    const response = await procesarEntradaUsuario('quiero hacer un pedido');
    expect(response).toBe(MENSAJES_BOT.PEDIR);
  });

  it('should handle invalid input', async () => {
    const response = await procesarEntradaUsuario('texto aleatorio');
    expect(response).toBe(MENSAJES_BOT.NO_ENTIENDO);
  });

  it('should process valid order item', async () => {
    const response = await procesarEntradaUsuario('2 California Roll');
    expect(response).toContain('He añadido 2x California Roll');
  });
});