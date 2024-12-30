'use client';

import { MessageCircle, User } from 'lucide-react';

interface ChatMessageProps {
  text: string;
  isBot: boolean;
}

export default function ChatMessage({ text, isBot }: ChatMessageProps) {
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[80%] rounded-lg p-3 flex items-start gap-2 ${
          isBot 
            ? 'bg-gray-700/90 text-white' 
            : 'bg-blue-600/90 text-white'
        }`}
      >
        {isBot ? (
          <MessageCircle className="w-5 h-5 mt-1 flex-shrink-0" />
        ) : (
          <User className="w-5 h-5 mt-1 flex-shrink-0" />
        )}
        <div className="whitespace-pre-wrap">{text}</div>
      </div>
    </div>
  );
}