import { memo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, TrendingUp, Shield, Wrench, Cog, FileText, MapPin, FileCheck, Home, Banknote, Building2, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useContent } from '@/hooks/useContent';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { staggerContainer, fadeInUp } from '@/hooks/useScrollAnimation';

type PillarIconKey = 'server' | 'trending-up' | 'shield' | 'wrench' | 'cog' | 'file-text';
type DetailIconKey = 'map-pin' | 'file-check' | 'home' | 'banknote' | 'server';

const pillarIconMap: Record<PillarIconKey, ReactNode> = {
  server: <Server className="h-8 w-8" />,
  "trending-up": <TrendingUp className="h-8 w-8" />,
  shield: <Shield className="h-8 w-8" />,
  wrench: <Wrench className="h-8 w-8" />,
  cog: <Cog className="h-8 w-8" />,
  "file-text": <FileText className="h-8 w-8" />
};

const detailIconMap: Record<DetailIconKey, ReactNode> = {
  "map-pin": <MapPin className="h-4 w-4" />,
  "file-check": <FileCheck className="h-4 w-4" />,
  "home": <Home className="h-4 w-4" />,
  "banknote": <Banknote className="h-4 w-4" />,
  "server": <Server className="h-4 w-4" />
};

const getPillarIcon = (key: string): ReactNode => {
  return pillarIconMap[key as PillarIconKey] ?? null;
};

const getDetailIcon = (key: string): ReactNode => {
  return detailIconMap[key as DetailIconKey] ?? null;
};

export const Offer = memo(function Offer() {
  const { t } = useTranslation('common');
  const content = useContent();
  const { offer } = content;
  const [isAdExpanded, setIsAdExpanded] = useState(false);

  const toggleAdExpanded = useCallback(() => {
    setIsAdExpanded(prev => !prev);
  }, []);

  return (
    <section id="offer" className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title={offer.title} 
          subtitle={offer.subtitle}
        />

        {/* Job Advertisement Encart */}
        {offer.jobAd && (
          <motion.div 
            className="max-w-4xl mx-auto mb-8 md:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="bg-slate-50 rounded-2xl border border-slate-200 shadow-lg overflow-hidden relative group hover:border-primary-200 transition-colors duration-300">
               {/* Top Accent Line */}
               <div className="h-1.5 w-full bg-gradient-to-r from-slate-700 via-primary-600 to-primary-400" />
               
               <div className="p-4 sm:p-6 md:p-8">
                 {/* Header */}
                 <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 border-b border-slate-200 pb-8">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Building2 className="w-5 h-5 text-slate-500" />
                        <span className="text-slate-500 font-medium uppercase tracking-wider text-xs">{t('offer.officialAd')}</span>
                      </div>
                      <h3 className="text-3xl font-bold text-slate-900 mb-2">{offer.jobAd.header}</h3>
                      <p className="text-primary-700 font-medium text-lg italic">"{offer.jobAd.subHeader}"</p>
                    </div>
                    {/* Quick Stats Grid */}
                    <div className="flex flex-wrap gap-2 md:max-w-xs justify-end">
                      {offer.jobAd.details.map((detail, idx) => (
                        <div key={idx} className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm text-slate-700 shadow-sm">
                          <span className="text-primary-500">{getDetailIcon(detail.icon)}</span>
                          <span className="font-semibold">{detail.value}</span>
                        </div>
                      ))}
                    </div>
                 </div>

                 {/* Content - Summary */}
                 <div className="prose prose-slate max-w-none text-slate-600 mb-6">
                   <p className="leading-relaxed">{offer.jobAd.about}</p>
                 </div>

                 {/* Content - Expandable Details */}
                 <div className="relative">
                   <AnimatePresence>
                     {isAdExpanded && (
                       <motion.div
                         initial={{ height: 0, opacity: 0 }}
                         animate={{ height: 'auto', opacity: 1 }}
                         exit={{ height: 0, opacity: 0 }}
                         className="overflow-hidden"
                       >
                         <div className="space-y-8 py-4">
                           {offer.jobAd.sections.map((section, idx) => (
                             <div key={idx}>
                               <h4 className="font-bold text-slate-900 text-lg mb-3 flex items-center gap-2">
                                 <span className="w-1.5 h-6 bg-primary-500 rounded-full" />
                                 {section.title}
                               </h4>
                               {section.isList && Array.isArray(section.content) ? (
                                 <ul className="space-y-2">
                                   {section.content.map((item, i) => (
                                     <li key={i} className="flex items-start text-slate-600">
                                       <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-slate-400 rounded-full flex-shrink-0" />
                                       <span className="leading-relaxed">{item}</span>
                                     </li>
                                   ))}
                                 </ul>
                               ) : (
                                 <p className="text-slate-600 leading-relaxed">{section.content}</p>
                               )}
                             </div>
                           ))}
                           <div className="bg-primary-50 p-6 rounded-xl border border-primary-100 text-center">
                             <p className="text-primary-800 font-bold text-lg">{offer.jobAd.footer}</p>
                           </div>
                           {offer.jobUrl && (
                             <div className="text-center">
                               <a
                                 href={offer.jobUrl}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="mt-6 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                               >
                                 <ExternalLink className="w-4 h-4" />
                                 {t('offer.viewOriginalAd')}
                               </a>
                             </div>
                           )}
                         </div>
                       </motion.div>
                     )}
                   </AnimatePresence>
                   
                   {/* Toggle Button */}
                   <button
                     onClick={toggleAdExpanded}
                     className="w-full flex items-center justify-center gap-2 py-4 min-h-[48px] text-primary-600 font-bold hover:text-primary-700 transition-colors border-t border-slate-100 mt-2 hover:bg-slate-50 rounded-b-xl"
                   >
                     {isAdExpanded ? (
                       <>
                         <ChevronUp className="w-5 h-5" />
                         {t('offer.collapseAd')}
                       </>
                     ) : (
                       <>
                         <ChevronDown className="w-5 h-5" />
                         {t('offer.expandAd')}
                       </>
                     )}
                   </button>
                   
                   {/* Fade Effect when closed */}
                   {!isAdExpanded && (
                     <div className="absolute bottom-[60px] left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />
                   )}
                 </div>
               </div>
            </div>
          </motion.div>
        )}

        {/* Candidate's Response / Pillars */}
        <div className="text-center mb-8 md:mb-12">
           <h3 className="text-2xl font-bold text-slate-900 mb-2">{t('offer.myUnderstanding')}</h3>
           <p className="text-slate-500 max-w-2xl mx-auto">{t('offer.myUnderstandingDesc')}</p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {offer.pillars.map((pillar) => (
            <motion.div key={pillar.id} variants={fadeInUp}>
              <Card className="h-full border-t-4 border-t-primary-500 hover:border-t-accent-500 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600">
                    {getPillarIcon(pillar.icon)}
                  </div>
                  <span className="text-4xl font-bold text-slate-100 select-none">0{pillar.id}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{pillar.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});