
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Type, FunctionDeclaration } from '@google/genai';
import { Product } from '../types';

interface GeminiAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onProductSelect: (p: Product) => void;
  onAddToCart: (id: string) => void;
  products: Product[];
}

const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ 
  isOpen, 
  onClose, 
  onProductSelect, 
  onAddToCart,
  products 
}) => {
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', text: string}[]>([
    { role: 'assistant', text: "¡Hola! Soy tu asistente de Modern Living. Puedo ayudarte a encontrar el gadget perfecto o incluso añadirlo directamente a tu carrito. ¿Qué estás buscando hoy?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Definición de Herramientas para Gemini (Function Calling)
  const searchProductsFunc: FunctionDeclaration = {
    name: 'search_products',
    parameters: {
      type: Type.OBJECT,
      description: 'Busca productos en la base de datos de la tienda por nombre o categoría.',
      properties: {
        query: { type: Type.STRING, description: 'Palabra clave de búsqueda (ej. altavoz, luz, gafas).' }
      },
      required: ['query']
    }
  };

  const addToCartFunc: FunctionDeclaration = {
    name: 'add_to_cart',
    parameters: {
      type: Type.OBJECT,
      description: 'Añade un producto específico al carrito de compras del usuario.',
      properties: {
        product_id: { type: Type.STRING, description: 'El ID único del producto.' }
      },
      required: ['product_id']
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `Eres el asistente experto de "Modern Living", una tienda de tecnología premium estilo Shopify. 
          Tu objetivo es guiar al usuario. Catálogo disponible: ${products.map(p => `${p.name} (ID: ${p.id}, Precio: $${p.price})`).join(', ')}.
          Si el usuario quiere comprar algo, usa la herramienta add_to_cart. Si busca algo, usa search_products.
          Sé elegante, breve y profesional.`,
          tools: [{ functionDeclarations: [searchProductsFunc, addToCartFunc] }]
        }
      });

      if (response.functionCalls) {
        for (const fc of response.functionCalls) {
          if (fc.name === 'search_products') {
            const query = (fc.args.query as string).toLowerCase();
            const results = products.filter(p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
            const resultText = results.length > 0 
              ? `He encontrado estos productos para ti: ${results.map(r => r.name).join(', ')}. ¿Te gustaría ver alguno en detalle?`
              : "Lo siento, no he encontrado productos que coincidan con esa búsqueda exacta.";
            setMessages(prev => [...prev, { role: 'assistant', text: resultText }]);
          } else if (fc.name === 'add_to_cart') {
            const pid = fc.args.product_id as string;
            const p = products.find(x => x.id === pid);
            if (p) {
              onAddToCart(pid);
              setMessages(prev => [...prev, { role: 'assistant', text: `¡Hecho! He añadido "${p.name}" a tu carrito. ¿Necesitas algo más?` }]);
            } else {
              setMessages(prev => [...prev, { role: 'assistant', text: "Hubo un problema al identificar el producto. ¿Podrías decirme el nombre de nuevo?" }]);
            }
          }
        }
      } else {
        setMessages(prev => [...prev, { role: 'assistant', text: response.text || "Estoy aquí para ayudarte con tus compras." }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', text: "Lo siento, mi conexión con la central está fallando. ¿Podemos intentarlo de nuevo?" }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-end sm:p-8 bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full sm:w-[450px] bg-white h-[90vh] sm:h-[700px] sm:rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden animate-in slide-in-from-right duration-500">
        {/* Header Asistente */}
        <div className="bg-gray-900 p-8 flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary-600 rounded-2xl shadow-lg shadow-primary-500/20">
              <span className="material-symbols-outlined">auto_awesome</span>
            </div>
            <div>
              <h3 className="font-display font-bold text-lg leading-none">Smart Concierge</h3>
              <p className="text-[10px] uppercase tracking-[0.2em] opacity-50 mt-1">AI Powered Shopping</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Chat */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 bg-gray-50/50">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-5 rounded-3xl text-sm leading-relaxed ${
                m.role === 'user' 
                ? 'bg-primary-600 text-white shadow-xl shadow-primary-500/20 rounded-tr-none' 
                : 'bg-white text-gray-800 border border-gray-100 shadow-sm rounded-tl-none'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white p-5 rounded-3xl rounded-tl-none border border-gray-100 shadow-sm">
                <div className="flex gap-1.5">
                  <span className="w-1.5 h-1.5 bg-primary-300 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-bounce delay-150"></span>
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce delay-300"></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input con Sugerencias */}
        <div className="p-8 bg-white border-t border-gray-100">
          <div className="relative group">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Escribe algo como 'Añade Lumina Hub'..."
              className="w-full bg-gray-50 border-none rounded-[1.5rem] py-5 pl-8 pr-16 text-sm focus:ring-4 focus:ring-primary-500/10 focus:bg-white transition-all outline-none"
            />
            <button 
              onClick={handleSend}
              disabled={isTyping}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-primary-600 transition-all shadow-lg active:scale-90 disabled:opacity-50"
            >
              <span className="material-symbols-outlined !text-[20px]">send</span>
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {['Gafas AR', 'Altavoces', 'Ofertas'].map(tag => (
              <button 
                key={tag}
                onClick={() => setInput(`Busca ${tag}`)}
                className="text-[10px] font-black uppercase tracking-widest text-gray-400 border border-gray-100 px-3 py-1.5 rounded-full hover:border-primary-600 hover:text-primary-600 transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiAssistant;
