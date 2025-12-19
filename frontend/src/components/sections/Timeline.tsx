import { memo, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Building2, CheckCircle2, ChevronRight, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useContent } from '@/hooks/useContent';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Badge } from '@/components/ui/Badge';

export const Timeline = memo(function Timeline() {
  const { t } = useTranslation('common');
  const content = useContent();
  const { timeline } = content;
  const [activeId, setActiveId] = useState(timeline.experiences[0]?.id ?? 1);

  const activeExperience = useMemo(
    () => timeline.experiences.find(exp => exp.id === activeId) ?? timeline.experiences[0],
    [timeline.experiences, activeId]
  );

  const handleExperienceSelect = useCallback((id: number) => {
    setActiveId(id);
  }, []);

  return (
    <section id="experience" className="py-12 md:py-20 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header with Total Experience Badge */}
        <div className="flex flex-col items-center mb-8 md:mb-12">
          <SectionTitle
            title={timeline.title}
            subtitle={t('timeline.subtitle')}
            className="mb-6"
          />
          {timeline.totalExperience && (
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-sm font-bold shadow-lg shadow-slate-200">
              <Clock className="w-4 h-4 text-primary-400" />
              {timeline.totalExperience}
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Navigation - Vertical on Desktop, Horizontal on Mobile */}
          <div className="lg:w-1/3 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide snap-x p-1">
            {timeline.experiences.map((exp) => (
              <button
                key={exp.id}
                onClick={() => handleExperienceSelect(exp.id)}
                className={`
                  relative group flex flex-col items-start p-4 rounded-xl transition-all duration-300 text-left min-w-[280px] lg:min-w-0 snap-start
                  ${activeId === exp.id 
                    ? 'bg-white shadow-md ring-2 ring-primary-500 z-10' 
                    : 'bg-white/50 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200'
                  }
                `}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className={`text-sm font-bold ${activeId === exp.id ? 'text-primary-600' : 'text-slate-500'}`}>
                    {exp.period.split('—')[0].trim()}
                  </span>
                  
                  {/* Duration Badge directly on button */}
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    activeId === exp.id 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'bg-slate-100 text-slate-500'
                  }`}>
                    {exp.duration}
                  </span>
                </div>
                
                <h3 className={`font-bold text-lg mb-0.5 leading-tight ${activeId === exp.id ? 'text-slate-900' : 'text-slate-600'}`}>
                  {exp.company}
                </h3>
                <p className={`text-sm truncate w-full ${activeId === exp.id ? 'text-slate-600' : 'text-slate-400'}`}>
                  {exp.role}
                </p>

                {/* Active Indicator Dot (Desktop only visually) */}
                {activeId === exp.id && (
                  <motion.div 
                    layoutId="activeDot" 
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-1.5 h-12 bg-primary-500 rounded-r-full hidden lg:block" 
                  />
                )}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="lg:w-2/3">
            <AnimatePresence mode='wait'>
              <motion.div
                key={activeExperience.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border border-slate-100 min-h-[400px] sm:min-h-[500px] flex flex-col relative overflow-hidden"
              >
                {/* Decorative Background Element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-50 to-slate-50 rounded-bl-[100px] -z-0 opacity-50" />

                {/* Header */}
                <div className="mb-6 border-b border-slate-100 pb-6 relative z-10">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                        {activeExperience.role}
                      </h3>
                      <div className="flex items-center text-lg text-primary-600 font-medium">
                        <Building2 className="w-5 h-5 mr-2" />
                        {activeExperience.company}
                      </div>
                    </div>
                    
                    {activeExperience.type === 'current' && (
                       <Badge variant="accent" className="bg-emerald-100 text-emerald-800 border-emerald-200">
                         {t('timeline.currentPosition')}
                       </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                    <div className="flex items-center bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                      <Calendar className="w-4 h-4 mr-2 text-primary-400" />
                      {activeExperience.period}
                    </div>
                    <div className="flex items-center bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                      <Clock className="w-4 h-4 mr-2 text-primary-400" />
                      {activeExperience.duration}
                    </div>
                    <div className="flex items-center bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                      <MapPin className="w-4 h-4 mr-2 text-primary-400" />
                      {activeExperience.location}
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="flex-grow relative z-10">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-primary-500" />
                    {t('timeline.keyAchievements')}
                  </h4>
                  <ul className="space-y-3 mb-8">
                    {activeExperience.highlights.map((item, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + (idx * 0.05) }}
                        className="flex items-start text-slate-700 leading-relaxed group"
                      >
                        <ChevronRight className="w-5 h-5 mr-2 text-primary-300 group-hover:text-primary-500 transition-colors flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Footer / Tags */}
                <div className="pt-6 mt-auto border-t border-slate-100 relative z-10">
                   <div className="flex flex-wrap gap-2">
                     {activeExperience.tags.map((tag, idx) => (
                       <motion.div
                         key={tag}
                         initial={{ opacity: 0, scale: 0.8 }}
                         animate={{ opacity: 1, scale: 1 }}
                         transition={{ delay: 0.3 + (idx * 0.05) }}
                       >
                         <Badge variant="secondary" className="hover:bg-primary-50 hover:text-primary-700 transition-colors">
                           {tag}
                         </Badge>
                       </motion.div>
                     ))}
                   </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
});