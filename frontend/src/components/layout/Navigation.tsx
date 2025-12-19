import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import type { FC, MouseEvent } from 'react';
import { Menu, X, Mail, Phone, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { useContent } from '@/hooks/useContent';

interface NavLink {
  name: string;
  href: string;
}

export const Navigation: FC = () => {
  const { t } = useTranslation('common');
  const content = useContent();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);

  const openEmail = useCallback(() => {
    window.location.href = `mailto:${content.contact.email}`;
    setIsContactOpen(false);
  }, [content.contact.email]);

  const openPhone = useCallback(() => {
    window.location.href = `tel:${content.contact.phone}`;
    setIsContactOpen(false);
  }, [content.contact.phone]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (contactRef.current && !contactRef.current.contains(event.target as Node)) {
        setIsContactOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const links: NavLink[] = useMemo(() => [
    { name: t('navigation.about'), href: '#about' },
    { name: t('navigation.skills'), href: '#skills' },
    { name: t('navigation.experience'), href: '#experience' },
    { name: t('navigation.projects'), href: '#projects' },
    { name: t('navigation.deployment'), href: '#deployment' },
  ], [t]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((href: string) => {
    setIsMobileMenuOpen(false);

    if (href === '#root') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }, []);

  const handleLinkClick = useCallback((e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href);
  }, [scrollToSection]);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/50 py-3 shadow-sm' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => handleLinkClick(e, '#root')}
              className="group flex items-center gap-2"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${isScrolled ? 'bg-primary-600 text-white' : 'bg-slate-900 text-white'}`}>
                <span className="font-bold text-lg">B</span>
              </div>
              <span className="font-bold text-sm md:text-lg tracking-tight text-slate-900">
                <span className="hidden sm:inline">Baptiste C. <span className="text-primary-600 px-1">×</span> Consort</span>
                <span className="sm:hidden">B.C. <span className="text-primary-600 px-0.5">×</span> Consort</span>
              </span>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary-600 hover:bg-slate-50/50 rounded-full transition-all duration-200"
                >
                  {link.name}
                </a>
              ))}
              <LanguageSwitcher />
              <div className="pl-4 ml-2 border-l border-slate-200 relative" ref={contactRef}>
                <Button
                  size="sm"
                  onClick={() => setIsContactOpen(!isContactOpen)}
                  className={!isScrolled ? 'shadow-lg shadow-primary-500/20' : ''}
                >
                  {t('navigation.contact')}
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isContactOpen ? 'rotate-180' : ''}`} />
                </Button>
                <AnimatePresence>
                  {isContactOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50"
                    >
                      <button
                        onClick={openEmail}
                        className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      >
                        <Mail className="h-4 w-4" />
                        <div>
                          <div className="font-medium">Email</div>
                          <div className="text-xs text-slate-500">{content.contact.email}</div>
                        </div>
                      </button>
                      <button
                        onClick={openPhone}
                        className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-primary-50 hover:text-primary-600 transition-colors border-t border-slate-100"
                      >
                        <Phone className="h-4 w-4" />
                        <div>
                          <div className="font-medium">Téléphone</div>
                          <div className="text-xs text-slate-500">{content.contact.phone}</div>
                        </div>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[56px] z-40 bg-white border-b border-slate-100 shadow-xl md:hidden"
          >
            <div className="flex flex-col p-4 space-y-2">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="block px-4 py-3 text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2 mt-2 border-t border-slate-100 space-y-2">
                <div className="flex items-center gap-2">
                  <LanguageSwitcher />
                  <span className="text-sm text-slate-500">{t('navigation.contact')} :</span>
                </div>
                <div className="flex gap-2">
                  <Button fullWidth variant="secondary" onClick={openEmail}>
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button fullWidth variant="secondary" onClick={openPhone}>
                    <Phone className="h-4 w-4 mr-2" />
                    Appeler
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};