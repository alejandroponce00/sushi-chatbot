'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { MENSAJES_BOT, procesarEntradaUsuario } from '@/lib/chatbot';
import { Message } from '@/types';
import { stringify } from 'node:querystring';

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { text: MENSAJES_BOT.BIENVENIDA, isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim() || isProcessing) return;

    const userMessage = { text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    try {
      const botResponse = await procesarEntradaUsuario(input);
      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: MENSAJES_BOT.ERROR, isBot: true }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg border-gray-700 shadow-xl">
      <div className="h-[600px] flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} {...message} />
          ))}
        </div>
        <ChatInput
          value={input}
          onChange={setInput}
          onSend={handleSendMessage}
        />
      </div>
    </Card>
  );
}