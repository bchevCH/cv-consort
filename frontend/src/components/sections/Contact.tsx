import { memo, useCallback } from 'react';
import { Mail, Phone, Linkedin, Github, MapPin, Check, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useContent } from '@/hooks/useContent';
import { Button } from '@/components/ui/Button';

export const Contact = memo(function Contact() {
  const { t } = useTranslation('common');
  const content = useContent();
  const { contact, whyConsort } = content;

  const sendEmail = useCallback(() => {
    window.location.href = `mailto:${contact.email}`;
  }, [contact.email]);

  const openLinkedIn = useCallback(() => {
    window.open(contact.linkedin, '_blank');
  }, [contact.linkedin]);

  return (
    <footer id="contact" className="bg-slate-950 text-white pt-12 md:pt-24 pb-8 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-primary-900/20 rounded-[100%] blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Why Consort Section - Integrated as premium cards */}
        <div className="mb-12 md:mb-24">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl font-bold mb-4">{t('contact.valueProposition')}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">{t('contact.valueQuestion')}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {whyConsort.reasons.map((reason, idx) => (
              <div key={idx} className="group bg-slate-900 p-4 sm:p-6 md:p-8 rounded-2xl border border-slate-800 hover:border-primary-600/50 transition-all duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors">
                  <span className="font-bold text-slate-200 group-hover:text-white">{idx + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-3">
                  {reason.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Footer Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 border-t border-slate-800 pt-12 md:pt-20 mb-12 md:mb-20">
          
          {/* Left Column: CTA */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight mb-6 sm:mb-8">
              {t('contact.readyToDeploy')}<br />
              <span className="text-primary-500">{t('contact.excellence')}</span>
            </h2>
            <p className="text-lg text-slate-400 mb-10 max-w-lg leading-relaxed">
              {t('contact.ctaDescription')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                variant="white"
                className="shadow-xl shadow-white/5"
                onClick={sendEmail}
              >
                <Mail className="w-5 h-5 mr-2" />
                {contact.email}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-900 hover:text-white hover:border-slate-500"
                onClick={openLinkedIn}
              >
                <Linkedin className="w-5 h-5 mr-2" />
                LinkedIn
              </Button>
            </div>
          </div>

          {/* Right Column: Info Grid */}
          <div className="lg:pl-12 lg:border-l border-slate-800 flex flex-col justify-center">
             <div className="grid sm:grid-cols-2 gap-10">
               <div>
                 <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">{t('contact.coordinates')}</h4>
                 <ul className="space-y-4">
                   <li>
                     <a href={`tel:${contact.phone}`} className="flex items-center text-lg hover:text-primary-400 transition-colors">
                       <Phone className="w-5 h-5 mr-3 text-slate-600" />
                       {contact.phone}
                     </a>
                   </li>
                   <li className="flex items-start">
                      <MapPin className="w-5 h-5 mr-3 text-slate-600 mt-1 flex-shrink-0" />
                      <span className="text-slate-300">{contact.address}</span>
                   </li>
                 </ul>
               </div>

               <div>
                 <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">{t('contact.status')}</h4>
                 <ul className="space-y-4">
                   <li className="flex items-center text-emerald-400">
                     <Check className="w-5 h-5 mr-3" />
                     {t('contact.immediateAvailability')}
                   </li>
                   <li className="flex items-center text-slate-300">
                     <div className="w-5 h-5 mr-3 flex items-center justify-center">
                       <span className="block w-2 h-2 bg-slate-600 rounded-full" />
                     </div>
                     {t('contact.gPermit')}
                   </li>
                 </ul>
               </div>
             </div>

             <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-slate-900 rounded-xl border border-slate-800">
               <h4 className="text-white font-bold mb-2">{t('contact.sourceCode')}</h4>
               <p className="text-slate-400 text-sm mb-4">
                 {t('contact.sourceCodeDesc')}
               </p>
               <a
                 href={contact.github}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center text-primary-400 hover:text-primary-300 font-medium transition-colors"
               >
                 <Github className="w-4 h-4 mr-2" />
                 {t('contact.viewRepository')}
                 <ExternalLink className="w-3 h-3 ml-1" />
               </a>
             </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
          <p>© {new Date().getFullYear()} Chevassut. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
});