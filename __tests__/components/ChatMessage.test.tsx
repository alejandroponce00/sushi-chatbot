import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ChatMessage from '@/components/ChatMessage';

describe('ChatMessage', () => {
  it('should render bot message correctly', () => {
    render(<ChatMessage text="Hola, ¿en qué puedo ayudarte?" isBot={true} />);
    expect(screen.getByText('Hola, ¿en qué puedo ayudarte?')).toBeDefined();
  });

  it('should render user message correctly', () => {
    render(<ChatMessage text="Quiero hacer un pedido" isBot={false} />);
    expect(screen.getByText('Quiero hacer un pedido')).toBeDefined();
  });

  it('should apply correct styling for bot message', () => {
    const { container } = render(<ChatMessage text="Bot message" isBot={true} />);
    expect(container.querySelector('.justify-start')).toBeDefined();
  });

  it('should apply correct styling for user message', () => {
    const { container } = render(<ChatMessage text="User message" isBot={false} />);
    expect(container.querySelector('.justify-end')).toBeDefined();
  });
});