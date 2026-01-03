
import React from 'react';
import { ViewMode, Language } from '../types';

interface FooterProps {
  onNavigate: (view: ViewMode) => void;
  onCategorySelect: (cat: string) => void;
  language: Language;
}

const DICT = {
  shop: { ES: 'Tienda', EN: 'Shop', FR: 'Boutique', DE: 'Shop', ZH: '商店' },
  support: { ES: 'Soporte', EN: 'Support', FR: 'Support', DE: 'Support', ZH: '支持' },
  company: { ES: 'Compañía', EN: 'Company', FR: 'Entreprise', DE: 'Firma', ZH: '公司' },
  new: { ES: 'Novedades', EN: 'New Arrivals', FR: 'Nouveautés', DE: 'Neuheiten', ZH: '新品' },
  best: { ES: 'Más Vendidos', EN: 'Best Sellers', FR: 'Meilleures Ventes', DE: 'Bestseller', ZH: '热销' },
  story: { ES: 'Nuestra Historia', EN: 'Our Story', FR: 'Notre Histoire', DE: 'Geschichte', ZH: '品牌故事' },
  eco: { ES: 'Sostenibilidad', EN: 'Sustainability', FR: 'Durabilité', DE: 'Nachhaltigkeit', ZH: '可持续性' },
  privacy: { ES: 'Privacidad', EN: 'Privacy', FR: 'Confidentialité', DE: 'Datenschutz', ZH: '隐私政策' },
  terms: { ES: 'Términos', EN: 'Terms', FR: 'Conditions', DE: 'AGB', ZH: '服务条款' },
  help: { ES: 'Centro de Ayuda', EN: 'Help Center', FR: 'Aide', DE: 'Hilfe', ZH: '帮助中心' }
};

const Footer: React.FC<FooterProps> = ({ onNavigate, onCategorySelect, language }) => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1">
            <div 
              onClick={() => onNavigate(ViewMode.HOME)}
              className="flex items-center gap-2 mb-8 cursor-pointer group"
            >
              <div className="bg-gray-900 text-white p-2 rounded-xl group-hover:bg-primary-600 transition-all"><span className="material-symbols-outlined !text-xl">storefront</span></div>
              <span className="font-display font-black text-2xl tracking-tighter">MODERN.</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 font-medium italic">
              "Curando lo esencial para el hogar inteligente de 2026."
            </p>
            <div className="flex gap-4">
              {['Instagram', 'Twitter', 'Pinterest'].map(s => (
                <button key={s} className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-gray-900 hover:text-white transition-all shadow-sm">
                  {s.slice(0, 2)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-gray-900 mb-8">{DICT.shop[language]}</h4>
            <ul className="space-y-4">
              <li><button onClick={() => onCategorySelect('New Arrivals')} className="text-sm font-bold text-gray-400 hover:text-black transition-colors">{DICT.new[language]}</button></li>
              <li><button onClick={() => onCategorySelect('All')} className="text-sm font-bold text-gray-400 hover:text-black transition-colors">{DICT.best[language]}</button></li>
              <li><button onClick={() => onCategorySelect('Home & Living')} className="text-sm font-bold text-gray-400 hover:text-black transition-colors">Home & Living</button></li>
              <li><button onClick={() => onCategorySelect('Tech')} className="text-sm font-bold text-gray-400 hover:text-black transition-colors">Tech Accessories</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-gray-900 mb-8">{DICT.support[language]}</h4>
            <ul className="space-y-4">
              <li><button onClick={() => onNavigate(ViewMode.SUPPORT)} className="text-sm font-bold text-gray-400 hover:text-black transition-colors">{DICT.help[language]}</button></li>
              <li><button onClick={() => onNavigate(ViewMode.SUPPORT)} className="text-sm font-bold text-gray-400 hover:text-black transition-colors">Envíos y Devoluciones</button></li>
              <li><button onClick={() => onNavigate(ViewMode.SUPPORT)} className="text-sm font-bold text-gray-400 hover:text-black transition-colors">Garantía Smart</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-gray-900 mb-8">{DICT.company[language]}</h4>
            <ul className="space-y-4">
              <li><button onClick={() => onNavigate(ViewMode.STORY)} className="text-sm font-bold text-gray-400 hover:text-black transition-colors">{DICT.story[language]}</button></li>
              <li><button onClick={() => onNavigate(ViewMode.SUSTAINABILITY)} className="text-sm font-bold text-gray-400 hover:text-black transition-colors">{DICT.eco[language]}</button></li>
              <li><button onClick={() => onNavigate(ViewMode.PRIVACY)} className="text-sm font-bold text-gray-400 hover:text-black transition-colors">{DICT.privacy[language]}</button></li>
              <li><button onClick={() => onNavigate(ViewMode.TERMS)} className="text-sm font-bold text-gray-400 hover:text-black transition-colors">{DICT.terms[language]}</button></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">© 2026 MODERN LIVING INC. GLOBAL HUB.</p>
          <div className="flex gap-6 grayscale opacity-30">
            {['Visa', 'Mastercard', 'ShopPay', 'PayPal'].map(p => (
              <span key={p} className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
