import { memo } from 'react';
import { motion } from 'framer-motion';
import { Bike, Car, Train, Navigation, Clock } from 'lucide-react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useContent } from '@/hooks/useContent';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { staggerContainer, fadeInUp } from '@/hooks/useScrollAnimation';
import type { CommuteMode } from '@/data/types';

type CommuteModeType = CommuteMode['type'];

const iconMap: Record<CommuteModeType, ReactNode> = {
  bike: <Bike className="w-6 h-6" />,
  car: <Car className="w-6 h-6" />,
  train: <Train className="w-6 h-6" />
};

const getIcon = (type: CommuteModeType): ReactNode => {
  return iconMap[type];
};

export const Commute = memo(function Commute() {
  const { t } = useTranslation('common');
  const content = useContent();
  const { commute } = content;

  // URL for Google Maps Embed centered on destination
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2761.884218843588!2d6.119864776855497!3d46.19159997111666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c7b2e3c004573%3A0x6226938957451664!2sEsplanade%20de%20Pont-Rouge%204%2C%201212%20Lancy%2C%20Switzerland!5e0!3m2!1sen!2sch!4v1708700000000!5m2!1sen!2sch`;

  return (
    <section id="commute" className="py-12 md:py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title={commute.title} 
          subtitle={commute.subtitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
          {/* Map Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="h-[300px] sm:h-[400px] lg:h-auto rounded-2xl overflow-hidden shadow-lg border border-slate-200 relative"
          >
            <iframe 
              src={mapUrl}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            />
            
            {/* Overlay Origin/Dest */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-xl border border-slate-200 shadow-sm text-sm">
              <div className="flex items-start gap-3 mb-3">
                 <div className="mt-1 w-2 h-2 rounded-full bg-slate-400" />
                 <div>
                   <span className="text-xs font-bold text-slate-400 uppercase">{t('commute.origin')}</span>
                   <div className="font-medium text-slate-700">{commute.origin}</div>
                 </div>
              </div>
              <div className="ml-1 pl-4 border-l-2 border-dashed border-slate-300 h-4 -my-2" />
              <div className="flex items-start gap-3 mt-3">
                 <div className="mt-1 w-2 h-2 rounded-full bg-primary-600" />
                 <div>
                   <span className="text-xs font-bold text-primary-600 uppercase">{t('commute.destination')}</span>
                   <div className="font-bold text-slate-900">{commute.destination}</div>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Details Column */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-4 justify-center"
          >
            {commute.modes.map((mode, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <Card 
                  className={`border-l-4 transition-all duration-300 ${
                    mode.preferred 
                      ? 'border-l-emerald-500 bg-emerald-50/30 border-slate-200' 
                      : 'border-l-slate-300 hover:border-l-primary-400'
                  }`}
                  hoverEffect={true}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${mode.preferred ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                        {getIcon(mode.type)}
                      </div>
                      <h4 className="font-bold text-slate-900">{mode.label}</h4>
                    </div>
                    
                    <div className="flex items-center gap-2">
                       {mode.preferred && (
                         <Badge variant="accent" className="bg-emerald-100 text-emerald-700 border-emerald-200">
                           {t('commute.preferred')}
                         </Badge>
                       )}
                       <div className="flex items-center font-bold text-slate-700 bg-white px-2 py-1 rounded border border-slate-200">
                         <Clock className="w-3 h-3 mr-1.5 text-slate-400" />
                         {mode.time}
                       </div>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 text-sm pl-[52px]">
                    {mode.details}
                  </p>
                </Card>
              </motion.div>
            ))}

            <motion.div variants={fadeInUp} className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
              <Navigation className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-600">
                <span className="font-bold text-slate-900">{t('commute.note')} :</span> {t('commute.noteText')}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});