import { memo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Layers, Wrench, Terminal, Database, TrendingUp, Code, Box, Book, Users, CheckCircle, ArrowRight, Download, Briefcase, Star } from 'lucide-react';
import type { ReactNode } from 'react';
import { useContent } from '@/hooks/useContent';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { staggerContainer, fadeInUp } from '@/hooks/useScrollAnimation';
import type { ProofType } from '@/data/types';

type MatchIconKey = 'calendar' | 'layers' | 'wrench' | 'terminal' | 'database' | 'trending-up' | 'code' | 'box' | 'book' | 'users' | 'briefcase';

const iconMap: Record<MatchIconKey, ReactNode> = {
  calendar: <Calendar className="h-5 w-5" />,
  layers: <Layers className="h-5 w-5" />,
  wrench: <Wrench className="h-5 w-5" />,
  terminal: <Terminal className="h-5 w-5" />,
  database: <Database className="h-5 w-5" />,
  "trending-up": <TrendingUp className="h-5 w-5" />,
  code: <Code className="h-5 w-5" />,
  box: <Box className="h-5 w-5" />,
  book: <Book className="h-5 w-5" />,
  users: <Users className="h-5 w-5" />,
  briefcase: <Briefcase className="h-5 w-5" />
};

const proofTypeStyles: Record<ProofType, string> = {
  experience: 'bg-slate-100 text-slate-600',
  project: 'bg-slate-100 text-slate-600',
  certification: 'bg-slate-100 text-slate-600',
  metric: 'bg-slate-100 text-slate-600'
};

const getIcon = (key: string): ReactNode => {
  return iconMap[key as MatchIconKey] ?? null;
};

export const Match = memo(function Match() {
  const content = useContent();
  const { match } = content;

  return (
    <section className="py-12 md:py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title={match.title} 
          subtitle={match.subtitle}
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {match.items.map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-lg hover:border-primary-200 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="flex flex-col h-full">
                {/* Header: Requirement with check/bonus badge */}
                <div className={`bg-gradient-to-r ${item.isBonus ? 'from-amber-50 to-amber-100/50' : 'from-slate-50 to-primary-50/30'} p-4 border-b border-slate-100`}>
                  <div className="flex items-start gap-3">
                    <div className={`h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center ${item.isBonus ? 'text-amber-600 group-hover:bg-amber-500' : 'text-primary-600 group-hover:bg-primary-600'} group-hover:text-white transition-all duration-300 flex-shrink-0`}>
                      {getIcon(item.icon)}
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {item.isBonus ? (
                          <>
                            <span className="text-xs font-medium text-amber-600 uppercase tracking-wider">{match.bonusLabel}</span>
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                          </>
                        ) : (
                          <>
                            <span className="text-xs font-medium text-primary-600 uppercase tracking-wider">{match.requiredLabel}</span>
                            <CheckCircle className="h-4 w-4 text-emerald-500" />
                          </>
                        )}
                      </div>
                      <h3 className="font-semibold text-slate-800 text-sm leading-tight">
                        {item.requirement}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Body: Response & Proof */}
                <div className="p-4 sm:p-5 flex-grow flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowRight className="h-4 w-4 text-primary-500" />
                    <p className="text-base font-bold text-slate-900">
                      {item.response}
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3 border-l-3 border-accent-400">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium mb-2 ${proofTypeStyles[item.proofType]}`}>
                      {match.proofTypes[item.proofType]}
                    </span>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {item.proof}
                    </p>
                  </div>
                  {item.downloadUrl && (
                    <a
                      href={item.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      {item.downloadLabel || 'Télécharger'}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});