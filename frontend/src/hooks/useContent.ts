/**
 * Hook to access the translated CV content (content.json).
 * Returns structured data with TypeScript typing.
 *
 * Usage:
 *   const content = useContent();
 *   const { hero, projects } = content;
 */
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { AppData } from '@/data/types';
import frContent from '@/i18n/locales/fr/content.json';
import enContent from '@/i18n/locales/en/content.json';

type SupportedLanguage = 'fr' | 'en';

const contentByLang: Record<SupportedLanguage, AppData> = {
  fr: frContent as unknown as AppData,
  en: enContent as unknown as AppData,
};

export const useContent = (): AppData => {
  const { i18n } = useTranslation();
  const lang: SupportedLanguage = i18n.language?.startsWith('en') ? 'en' : 'fr';

  return useMemo(() => contentByLang[lang], [lang]);
};
