
import React from 'react';
import { Language } from '../types';
import { LANGUAGES } from '../constants';

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onSelectLanguage: (language: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onSelectLanguage }) => {
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const langCode = e.target.value;
    const lang = LANGUAGES.find(l => l.code === langCode);
    if (lang) {
      onSelectLanguage(lang);
    }
  };

  return (
    <div>
      <select
        value={selectedLanguage.code}
        onChange={handleSelect}
        className="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
      >
        {LANGUAGES.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
