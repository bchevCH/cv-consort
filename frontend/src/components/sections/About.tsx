import { memo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Car, Briefcase, User, Cpu, Mountain, Rocket, Puzzle, ChevronLeft, ChevronRight, Circle, CircleDot, Target, ArrowRight, Clock, Globe, Anchor } from 'lucide-react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useContent } from '@/hooks/useContent';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { staggerContainer, fadeInUp } from '@/hooks/useScrollAnimation';

type IconKey = 'map-pin' | 'car' | 'briefcase' | 'user' | 'clock' | 'globe' | 'cpu' | 'mountain' | 'rocket' | 'puzzle' | 'anchor';

const iconMap: Record<IconKey, ReactNode> = {
  "map-pin": <MapPin className="w-4 h-4" />,
  "car": <Car className="w-4 h-4" />,
  "briefcase": <Briefcase className="w-4 h-4" />,
  "user": <User className="w-4 h-4" />,
  "clock": <Clock className="w-4 h-4" />,
  "globe": <Globe className="w-4 h-4" />,
  "cpu": <Cpu className="w-6 h-6" />,
  "mountain": <Mountain className="w-6 h-6" />,
  "rocket": <Rocket className="w-6 h-6" />,
  "puzzle": <Puzzle className="w-6 h-6" />,
  "anchor": <Anchor className="w-6 h-6" />
};

const getIcon = (key: string): ReactNode => {
  return iconMap[key as IconKey] ?? null;
};

export const About = memo(function About() {
  const { t } = useTranslation('common');
  const content = useContent();
  const { about } = content;
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const photoCount = about.photos.length;

  const nextPhoto = useCallback(() => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photoCount);
  }, [photoCount]);

  const prevPhoto = useCallback(() => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photoCount) % photoCount);
  }, [photoCount]);

  const goToPhoto = useCallback((index: number) => {
    setCurrentPhotoIndex(index);
  }, []);

  return (
    <section id="about" className="py-12 md:py-20 bg-white border-b border-slate-100">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title={about.title} 
          subtitle={about.subtitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          {/* Left Column: Photo Carousel & Status */}
          <motion.div 
            className="lg:col-span-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="relative group max-w-md mx-auto">
              <div className="absolute inset-0 bg-primary-600 rounded-2xl rotate-3 opacity-10 group-hover:rotate-6 transition-transform duration-300" />
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white">
                {/* Carousel Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
                  <AnimatePresence mode='wait'>
                    <motion.img 
                      key={currentPhotoIndex}
                      src={about.photos[currentPhotoIndex]} 
                      alt="Baptiste Chevassut" 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full object-cover" 
                    />
                  </AnimatePresence>

                  {/* Controls */}
                  {about.photos.length > 1 && (
                    <>
                      <div className="absolute inset-0 flex items-center justify-between p-2 sm:p-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={prevPhoto}
                          className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextPhoto}
                          className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                      
                      {/* Indicators */}
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                        {about.photos.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => goToPhoto(idx)}
                            className="text-white/80 hover:text-white transition-colors"
                          >
                            {idx === currentPhotoIndex ? (
                              <CircleDot className="w-2.5 h-2.5 fill-current" />
                            ) : (
                              <Circle className="w-2.5 h-2.5" />
                            )}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                
                {/* Status Overlay/Footer */}
                <div className="bg-white p-4 sm:p-6 border-t border-slate-100">
                  <div className="space-y-4">
                    {about.status.map((item, idx) => (
                      <div key={idx} className="flex items-center text-slate-700">
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-primary-600 mr-3 flex-shrink-0">
                          {getIcon(item.icon)}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.label}</div>
                          <div className="font-medium">{item.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio & Passions */}
          <motion.div 
            className="lg:col-span-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="prose prose-lg text-slate-600 mb-8">
              {about.description.map((paragraph, idx) => (
                <motion.p key={idx} variants={fadeInUp} className="leading-relaxed">
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Growth Focus Encadré */}
            {about.growthFocus && (
               <motion.div 
                 variants={fadeInUp}
                 className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-6 mb-8 sm:mb-12 shadow-sm relative overflow-hidden"
               >
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100 rounded-full blur-3xl -mr-10 -mt-10 opacity-50" />
                 
                 <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 relative z-10">
                   <Target className="w-5 h-5 text-primary-600" />
                   {about.growthFocus.title}
                 </h3>
                 <ul className="space-y-3 relative z-10">
                   {about.growthFocus.items.map((item, idx) => (
                     <li key={idx} className="flex items-start text-slate-700">
                       <ArrowRight className="w-4 h-4 mr-3 text-primary-400 mt-1 flex-shrink-0" />
                       <span>{item}</span>
                     </li>
                   ))}
                 </ul>
               </motion.div>
            )}

            <motion.div variants={fadeInUp}>
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                <span className="w-8 h-1 bg-primary-500 rounded-full mr-3" />
                {t('about.passionTitle')}
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {about.passions.map((passion, idx) => (
                  <Card key={idx} className="h-full bg-slate-50 border-slate-200 hover:border-primary-200">
                    <div className="text-primary-600 mb-3">
                      {getIcon(passion.icon)}
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">{passion.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {passion.description}
                    </p>
                  </Card>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});