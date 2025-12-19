import { memo } from 'react';
import { motion } from 'framer-motion';
import { Settings, Server, Container, GitBranch, ArrowRight, Github, CheckCircle } from 'lucide-react';
import type { ReactNode } from 'react';
import { useContent } from '@/hooks/useContent';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { staggerContainer, fadeInUp } from '@/hooks/useScrollAnimation';

const stepIcons: ReactNode[] = [
  <Settings key="settings" className="w-6 h-6" />,
  <Server key="server" className="w-6 h-6" />,
  <Container key="container" className="w-6 h-6" />,
  <GitBranch key="gitbranch" className="w-6 h-6" />
];

export const Deployment = memo(function Deployment() {
  const content = useContent();
  const { deployment } = content;

  return (
    <section id="deployment" className="py-12 md:py-20 bg-slate-900 text-white overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <div className="relative z-10">
          <SectionTitle
            title={deployment.title}
            subtitle={deployment.subtitle}
            variant="light"
          />

          {/* Intro - Over-engineered explanation */}
          {deployment.intro && (
            <motion.div
              className="max-w-3xl mx-auto text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl md:text-2xl font-bold text-primary-400 mb-4">
                {deployment.intro.title}
              </h3>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                {deployment.intro.description}
              </p>
            </motion.div>
          )}
        </div>

        {/* Steps */}
        <motion.div
          className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {deployment.steps.map((step, index) => (
            <motion.div key={step.id} variants={fadeInUp} className="relative">
              {/* Connector Arrow */}
              {index < deployment.steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-4 text-slate-700 transform translate-x-1/2 z-0">
                  <ArrowRight className="w-6 h-6" />
                </div>
              )}

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-slate-700 hover:border-primary-500 transition-colors h-full flex flex-col relative z-10 group">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-900 border-2 border-primary-500/50 group-hover:border-primary-500 flex items-center justify-center text-primary-400 mb-4 sm:mb-6 mx-auto shadow-[0_0_15px_rgba(37,99,235,0.1)] group-hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300">
                  {stepIcons[index]}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white text-center mb-1">{step.title}</h3>
                <p className="text-xs text-primary-400 text-center font-mono mb-4">{step.subtitle}</p>

                <div className="flex-grow">
                  <ul className="space-y-2">
                    {step.components.map((comp, i) => (
                      <li key={i} className="text-sm text-slate-400 flex items-center justify-center md:justify-start">
                        <span className="w-1.5 h-1.5 bg-slate-600 rounded-full mr-2" />
                        {comp}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700 text-center">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider group-hover:text-primary-400 transition-colors">
                    {step.skill}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Result + CTA */}
        <motion.div
          className="relative z-10 mt-12 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Result box */}
          {deployment.result && (
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-primary-500/30 mb-8 max-w-2xl w-full">
              <h4 className="text-lg font-bold text-white text-center mb-4">{deployment.result.title}</h4>
              <div className="flex flex-wrap justify-center gap-4">
                {deployment.result.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-300 bg-slate-900/50 px-3 py-2 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="font-mono">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GitHub CTA */}
          {deployment.cta && (
            <a
              href={deployment.cta.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-lg border border-slate-600 hover:border-primary-500 transition-all duration-300 group"
            >
              <Github className="w-5 h-5 group-hover:text-primary-400 transition-colors" />
              <span>{deployment.cta.text}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
});
