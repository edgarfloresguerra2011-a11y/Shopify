
import React from 'react';
import { Product, ViewMode, Language } from '../types';

interface HomeProps {
  onProductSelect: (product: Product) => void;
  onNavigate: (view: ViewMode) => void;
  highlights: Product[];
  language: Language;
}

const translations = {
  heroTitle: { ES: 'Redefine tu Estilo de Vida.', EN: 'Redefine your Lifestyle.', FR: 'Redéfinissez votre Style.', DE: 'Definiere deinen Stil neu.', ZH: '重新定义你的生活方式。' },
  heroSubtitle: { ES: 'Lo mejor en tecnología y gadgets para tu hogar.', EN: 'Curated tech and gadgets for your modern home.', FR: 'Tech et gadgets pour votre maison moderne.', DE: 'Technik für dein modernes Zuhause.', ZH: '专为现代家居打造的科技产品。' },
  shopNow: { ES: 'Comprar Ahora', EN: 'Shop Now', FR: 'Acheter Now', DE: 'Jetzt Kaufen', ZH: '立即购买' },
  collections: { ES: 'Colecciones', EN: 'Collections', FR: 'Collections', DE: 'Kollektionen', ZH: '系列' }
};

const Home: React.FC<HomeProps> = ({ onProductSelect, onNavigate, highlights, language }) => {
  return (
    <div className="flex flex-col gap-24 pb-24">
      <section className="relative h-[800px] sm:mx-8 sm:mt-8 sm:rounded-[3rem] overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://picsum.photos/seed/hero2026/1920/1080)' }}>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative h-full flex flex-col justify-center px-12 sm:px-24 text-white max-w-5xl">
          <h1 className="font-display font-black text-6xl md:text-9xl leading-[0.9] mb-8 animate-in slide-in-from-bottom duration-700">
            {translations.heroTitle[language]}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-xl font-medium">
            {translations.heroSubtitle[language]}
          </p>
          <div className="flex gap-6">
            <button onClick={() => onNavigate(ViewMode.SHOP)} className="bg-white text-black px-12 py-6 rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
              {translations.shopNow[language]}
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 w-full">
        <h2 className="font-display text-4xl font-black mb-16 tracking-tighter">{translations.collections[language]}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map(p => (
            <div key={p.id} onClick={() => onProductSelect(p)} className="group cursor-pointer">
              <div className="aspect-square rounded-[3rem] overflow-hidden bg-gray-100 mb-8 shadow-sm">
                <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              </div>
              <h3 className="font-bold text-2xl mb-2">{p.name}</h3>
              <p className="text-gray-400 font-bold">${p.price}.00</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
