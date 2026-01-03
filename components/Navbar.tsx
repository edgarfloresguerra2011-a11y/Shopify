
import React, { useState } from 'react';
import { ViewMode, Language, Dictionary } from '../types';

interface NavbarProps {
  onNavigate: (view: ViewMode) => void;
  onCategorySelect: (cat: string) => void;
  cartCount: number;
  wishlistCount: number;
  onSearch: (q: string) => void;
  language: Language;
  onLanguageChange: (l: Language) => void;
}

const NAVBAR_DICT: any = {
  nav_new: { ES: 'Novedades', EN: 'New Arrivals', FR: 'Nouveautés', DE: 'Neuheiten', ZH: '新品' },
  nav_home: { ES: 'Hogar', EN: 'Home & Living', FR: 'Maison', DE: 'Heim & Wohnen', ZH: '家居' },
  nav_tech: { ES: 'Tech', EN: 'Tech', FR: 'Tech', DE: 'Technik', ZH: '科技' },
  nav_sale: { ES: 'Ofertas', EN: 'Sale', FR: 'Promos', DE: 'Angebote', ZH: '特价' },
  nav_search: { ES: 'Buscar...', EN: 'Search...', FR: 'Chercher...', DE: 'Suchen...', ZH: '搜索...' }
};

const Navbar: React.FC<NavbarProps> = ({ 
  onNavigate, 
  onCategorySelect, 
  cartCount, 
  wishlistCount, 
  onSearch, 
  language, 
  onLanguageChange 
}) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langs: {code: Language, label: string}[] = [
    { code: 'ES', label: 'Español' },
    { code: 'EN', label: 'English' },
    { code: 'FR', label: 'Français' },
    { code: 'DE', label: 'Deutsch' },
    { code: 'ZH', label: '中文' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 h-20 px-6 sm:px-12 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-12">
        <div 
          onClick={() => onNavigate(ViewMode.HOME)} 
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="bg-gray-900 text-white p-2 rounded-xl group-hover:bg-primary-600 transition-all">
            <span className="material-symbols-outlined !text-xl">storefront</span>
          </div>
          <span className="font-display font-black text-2xl tracking-tighter text-gray-900">MODERN.</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-8">
          <button onClick={() => onCategorySelect('New Arrivals')} className="text-[11px] font-black text-gray-900 hover:text-primary-600 transition-colors uppercase tracking-[0.2em]">{NAVBAR_DICT.nav_new[language]}</button>
          <button onClick={() => onCategorySelect('Home & Living')} className="text-[11px] font-black text-gray-900 hover:text-primary-600 transition-colors uppercase tracking-[0.2em]">{NAVBAR_DICT.nav_home[language]}</button>
          <button onClick={() => onCategorySelect('Tech')} className="text-[11px] font-black text-gray-900 hover:text-primary-600 transition-colors uppercase tracking-[0.2em]">{NAVBAR_DICT.nav_tech[language]}</button>
          <button onClick={() => onCategorySelect('Sale')} className="text-[11px] font-black text-red-600 hover:text-red-700 transition-colors uppercase tracking-[0.2em]">{NAVBAR_DICT.nav_sale[language]}</button>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center bg-gray-50 rounded-full px-4 py-2 border border-gray-100 focus-within:bg-white focus-within:border-gray-300 transition-all">
          <span className="material-symbols-outlined text-gray-400 !text-xl">search</span>
          <input 
            type="text" 
            placeholder={NAVBAR_DICT.nav_search[language]} 
            onChange={(e) => onSearch(e.target.value)}
            className="bg-transparent border-none focus:ring-0 text-xs px-2 w-32 xl:w-48 text-gray-900 font-bold"
          />
        </div>

        <div className="relative">
          <button 
            onClick={() => setIsLangOpen(!isLangOpen)} 
            className="flex items-center gap-2 text-[10px] font-black bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-all"
          >
            {language}
            <span className="material-symbols-outlined !text-xs">expand_more</span>
          </button>
          
          {isLangOpen && (
            <div className="absolute top-full right-0 mt-3 bg-white border border-gray-100 rounded-2xl shadow-2xl p-2 min-w-[140px] animate-in fade-in zoom-in duration-200">
              {langs.map(l => (
                <button 
                  key={l.code}
                  onClick={() => { onLanguageChange(l.code); setIsLangOpen(false); }}
                  className={`w-full text-left px-4 py-3 text-xs font-bold rounded-xl transition-all ${language === l.code ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button className="relative p-2 text-gray-600 hover:text-gray-900">
            <span className="material-symbols-outlined !text-2xl">favorite</span>
            {wishlistCount > 0 && <span className="absolute top-1 right-1 bg-red-500 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">{wishlistCount}</span>}
          </button>
          <button 
            onClick={() => onNavigate(ViewMode.CART)} 
            className="relative p-2 text-gray-600 hover:text-gray-900"
          >
            <span className="material-symbols-outlined !text-2xl">shopping_bag</span>
            {cartCount > 0 && <span className="absolute top-1 right-1 bg-gray-900 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">{cartCount}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
