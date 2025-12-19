import { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FileCheck, Award, CheckCircle2, Quote, Download, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useContent } from '@/hooks/useContent';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { staggerContainer, fadeInUp } from '@/hooks/useScrollAnimation';

const getInitials = (name: string): string => {
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
};

export const Testimonials = memo(function Testimonials() {
  const { t } = useTranslation('common');
  const content = useContent();
  const { testimonials } = content;

  const openExternalLink = useCallback((url: string | undefined) => {
    if (url) {
      window.open(url, '_blank');
    }
  }, []);

  return (
    <section id="testimonials" className="py-12 md:py-24 bg-white relative">
      {/* Subtle Background */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-slate-50 skew-y-1 transform origin-top-left -z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle title={testimonials.title} />

        {/* Featured Recommendation (Official Letter) */}
        {testimonials.recommendation && (
          <motion.div 
            className="max-w-4xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="relative rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden group hover:border-blue-200 transition-colors duration-300">
               {/* Decorative Header */}
               <div className="h-2 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500" />
               
               <div className="p-4 sm:p-6 md:p-10">
                 <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Icon Column */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 border border-blue-100 shadow-sm">
                        <FileCheck className="w-8 h-8" />
                      </div>
                    </div>

                    {/* Content Column */}
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                            {t('testimonials.certificate')}
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                              <Award className="w-3 h-3 mr-1" />
                              {t('testimonials.official')}
                            </span>
                          </h3>
                          <div className="text-slate-500 font-medium mt-1">
                            {testimonials.recommendation.company}
                          </div>
                        </div>
                        <div className="text-right">
                           <div className="text-sm font-bold text-slate-900">{testimonials.recommendation.author}</div>
                           <div className="text-xs text-slate-500">{testimonials.recommendation.role}</div>
                        </div>
                      </div>

                      <div className="relative">
                        <Quote className="absolute -top-2 -left-4 w-8 h-8 text-blue-100/50 -z-10 transform -scale-x-100" />
                        <p className="text-lg text-slate-700 leading-relaxed italic mb-6">
                          "{testimonials.recommendation.excerpt}"
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-slate-100">
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider py-1.5 mr-2">{t('testimonials.qualities')} :</span>
                          {testimonials.recommendation.qualities.map((quality, idx) => (
                             <Badge key={idx} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100">
                               <CheckCircle2 className="w-3 h-3 mr-1.5" />
                               {quality}
                             </Badge>
                          ))}
                        </div>
                        
                        {testimonials.recommendation.downloadUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-shrink-0 border-blue-200 text-blue-600 hover:bg-blue-50"
                            onClick={() => openExternalLink(testimonials.recommendation?.downloadUrl)}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            {t('testimonials.downloadCertificate')}
                          </Button>
                        )}
                      </div>
                    </div>
                 </div>
               </div>
            </div>
          </motion.div>
        )}

        {/* LinkedIn Recommendations Grid */}
        <div className="text-center mb-10">
           <h3 className="text-xl font-bold text-slate-900 flex items-center justify-center gap-2">
             <span className="bg-[#0077b5] text-white p-1 rounded-md w-6 h-6 flex items-center justify-center text-xs font-bold">in</span>
             {t('testimonials.linkedinTitle')}
           </h3>
           <p className="text-slate-500 text-sm mt-1">{t('testimonials.linkedinSubtitle')}</p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.items.map((item, index) => (
            <motion.div key={index} variants={fadeInUp} className="h-full">
              <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                {/* LinkedIn Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    {/* Simulated LinkedIn Avatar */}
                    <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center relative">
                        {item.avatar && item.avatar.includes('http') ? (
                           <img src={item.avatar} alt={item.author} className="w-full h-full object-cover" />
                        ) : (
                           <span className="font-bold text-slate-400 text-sm">{getInitials(item.author)}</span>
                        )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base leading-tight">
                      {item.author}
                    </h4>
                    <p className="text-xs text-slate-500 leading-tight mt-1">
                      {item.role}
                    </p>
                  </div>
                </div>

                {/* Relationship Context (The gray text) */}
                <div className="text-xs text-slate-400 mb-4 pb-4 border-b border-slate-100">
                  {item.relation}
                </div>

                {/* Content */}
                <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line flex-grow">
                  {item.content}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* See more button */}
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="text-center"
        >
          <Button
            variant="secondary"
            onClick={() => openExternalLink(content.contact.linkedin)}
            className="text-slate-600 hover:text-[#0077b5] border-slate-200 hover:border-[#0077b5]"
          >
            {t('testimonials.seeMoreLinkedin')}
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
});