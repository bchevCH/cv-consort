import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

type SupportedLanguage = 'fr' | 'en';

export const LanguageSwitcher = memo(function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang: SupportedLanguage = i18n.language?.startsWith('en') ? 'en' : 'fr';

  const toggleLanguage = useCallback(() => {
    i18n.changeLanguage(currentLang === 'fr' ? 'en' : 'fr');
  }, [currentLang, i18n]);

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-3 py-2.5 min-h-[44px] text-sm font-medium text-slate-600 hover:text-primary-600 hover:bg-slate-50/50 rounded-full transition-all duration-200"
      aria-label={currentLang === 'fr' ? 'Switch to English' : 'Passer en français'}
    >
      <Globe className="w-4 h-4" />
      <span className="uppercase">{currentLang}</span>
    </button>
  );
});
