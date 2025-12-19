/**
 * i18n Configuration
 *
 * This file initializes react-i18next for multi-language support (FR/EN).
 *
 * Structure:
 * - common.json: UI labels, buttons, navigation text
 * - content.json: CV data (experiences, projects, skills, etc.)
 *
 * Language detection:
 * 1. First checks localStorage for user preference
 * 2. Falls back to browser language
 * 3. Defaults to French if no match
 *
 * Usage in components:
 * - UI labels: const { t } = useTranslation('common'); t('key')
 * - CV content: const content = useContent(); content.hero.name
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import frCommon from './locales/fr/common.json';
import frContent from './locales/fr/content.json';
import enCommon from './locales/en/common.json';
import enContent from './locales/en/content.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: {
        common: frCommon,
        content: frContent,
      },
      en: {
        common: enCommon,
        content: enContent,
      },
    },
    fallbackLng: 'fr',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
