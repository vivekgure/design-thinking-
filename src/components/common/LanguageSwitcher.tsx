import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { SUPPORTED_LANGUAGES, Language } from '../../i18n/translations';
import { Globe, ChevronDown } from 'lucide-react';

interface LanguageSwitcherProps {
  compact?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ compact = false }) => {
  const { language, setLanguage } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 rounded-lg border transition-all cursor-pointer font-medium ${
          compact
            ? 'px-2 py-1 bg-[#0d4030] hover:bg-[#1f8b68]/40 border-[#1f8b68]/50 text-white text-[11px]'
            : 'px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 text-xs shadow-2xs'
        }`}
        aria-label="Select Language"
      >
        <Globe className={`${compact ? 'w-3 h-3 text-emerald-300' : 'w-3.5 h-3.5 text-[#176B50]'}`} />
        <span className="font-bold">{currentLang.nativeName}</span>
        <ChevronDown className={`w-3 h-3 opacity-60 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-1.5 w-44 rounded-xl bg-white shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 ${
            compact ? 'text-slate-800' : ''
          }`}
        >
          <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
            Select Language / மொழி
          </div>
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = lang.code === language;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#E8F5EE] text-[#176B50] font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{lang.flag}</span>
                  <div>
                    <span className="block leading-tight">{lang.nativeName}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{lang.name}</span>
                  </div>
                </div>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#176B50]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

