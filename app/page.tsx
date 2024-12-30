import ChatInterface from '@/components/ChatInterface';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Imagen de fondo con overlay */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/sushi-bg.jpg"
          alt="Sushi background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image
              src="/sushi-logo.png"
              alt="Sushi Samurai Logo"
              width={120}
              height={120}
              className="rounded-full"
            />
          </div>
          <h1 className="text-4xl font-bold mb-2 text-white">Sushi Samurai</h1>
          <p className="text-gray-300">¡Pide tu sushi favorito a través de nuestro chatbot!</p>
        </header>
        <ChatInterface />
      </div>
    </div>
  );
}