import { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { useContent } from '@/hooks/useContent';
import { Button } from '@/components/ui/Button';

const leftContentAnimation = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const badgeAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.2 }
};

const terminalAnimation = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: { duration: 0.8, delay: 0.2 }
};

export const Hero = memo(function Hero() {
  const content = useContent();
  const { hero, profile } = content;

  const scrollToSection = useCallback((anchor: string) => {
    const elementId = anchor.replace('#', '');
    document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const openExternalLink = useCallback((href: string) => {
    window.open(href, '_blank');
  }, []);

  return (
    <section className="relative min-h-screen bg-slate-50 overflow-hidden">
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10 pt-28 sm:pt-32 lg:pt-36 pb-12">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16">
          
          {/* Left: Text Content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={leftContentAnimation.initial}
            animate={leftContentAnimation.animate}
            transition={leftContentAnimation.transition}
          >
            <motion.div
              initial={badgeAnimation.initial}
              animate={badgeAnimation.animate}
              transition={badgeAnimation.transition}
              className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8"
            >
              <span className="inline-flex items-center py-1.5 px-4 rounded-full bg-emerald-100/50 border border-emerald-200 text-emerald-700 font-bold text-xs uppercase tracking-wide">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
                {profile.availability}
              </span>
               <span className="inline-block py-1.5 px-4 rounded-full bg-slate-100 border border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-wide">
                {profile.permit}
              </span>
            </motion.div>
            
            <h1 className="font-bold text-slate-900 mb-4 sm:mb-6 tracking-tight">
              <span className="block text-[clamp(2rem,6vw,4.5rem)] leading-[1.1]">{hero.name}</span>
              <span className="block text-[clamp(1.5rem,5vw,3.75rem)] leading-[1.2] text-primary-600">{hero.title}</span>
            </h1>
            
            <p className="text-lg lg:text-xl font-medium text-slate-800 mb-4 max-w-2xl mx-auto lg:mx-0">
              {hero.tagline}
            </p>

            <p className="text-base lg:text-lg text-slate-500 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {hero.description}
            </p>

            <div className="grid grid-cols-3 gap-4 lg:gap-6 mb-8 max-w-lg lg:max-w-2xl mx-auto lg:mx-0 border-t border-b border-slate-200 py-4 lg:py-6">
              {hero.stats.map((stat, i) => (
                <div key={i} className="text-center lg:text-left">
                  <div className="text-base lg:text-lg font-bold text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-[10px] lg:text-xs text-slate-500 uppercase tracking-wider font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button onClick={() => scrollToSection(hero.cta.primary.anchor)}>
                {hero.cta.primary.text}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="secondary" onClick={() => openExternalLink(hero.cta.secondary.href)}>
                {hero.cta.secondary.text}
                <Download className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          {/* Right: Terminal Visual */}
          <motion.div
            className="flex-1 w-full max-w-lg lg:max-w-xl"
            initial={terminalAnimation.initial}
            animate={terminalAnimation.animate}
            transition={terminalAnimation.transition}
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-800 font-mono text-xs sm:text-sm leading-5 sm:leading-6">
              {/* Terminal Header */}
              <div className="bg-slate-800/80 backdrop-blur px-4 py-3 flex items-center justify-between border-b border-slate-700">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <div className="text-slate-400 text-xs">baptiste@consort-switzerland:~</div>
                <div className="w-4" /> {/* Spacer */}
              </div>

              {/* Terminal Body */}
              <div className="p-4 sm:p-6 text-slate-300">
                <div className="mb-4">
                  <span className="text-emerald-400">baptiste@consort</span>:<span className="text-blue-400">~</span>$ ./check_compatibility.sh --target=&quot;Consort_Switzerland&quot;
                  <div className="mt-2 text-slate-400">
                    {'>'} Loading job specs: &quot;Ingénieur OpenStack H/F&quot;... <span className="text-emerald-400">DONE</span><br/>
                    {'>'} Mission type: Placement Client... <span className="text-emerald-400">COMPATIBLE</span><br/>
                    {'>'} Analyzing core values... &quot;Humain&quot;, &quot;Responsabilité&quot;... <span className="text-emerald-400">MATCH</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-slate-400 mb-1">{'>'} Checking technical stack:</div>
                  <div className="pl-2">
                    [<span className="text-emerald-400">✓</span>] OpenStack (Nova, Neutron, Cinder)<br/>
                    [<span className="text-emerald-400">✓</span>] Linux (Rocky, CentOS, Ubuntu)<br/>
                    [<span className="text-emerald-400">✓</span>] Automation (Ansible, Terraform)<br/>
                    [<span className="text-emerald-400">✓</span>] Troubleshooting (Compute, Net, Storage)
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-slate-400 mb-1">{'>'} Checking soft skills:</div>
                  <div className="pl-2">
                    [<span className="text-emerald-400">✓</span>] Esprit d'équipe<br/>
                    [<span className="text-emerald-400">✓</span>] Communication<br/>
                    [<span className="text-emerald-400">✓</span>] Envie de bouger et respirer
                  </div>
                </div>

                <div className="mb-4 text-emerald-400 font-semibold">
                  {'>'} Result: <span className="bg-emerald-500/20 px-2 py-0.5 rounded">✓ READY TO ONBOARD</span>
                </div>

                <div className="flex items-center">
                   <span className="text-emerald-400">baptiste@consort</span>:<span className="text-blue-400">~</span>$
                   <span className="w-2.5 h-5 bg-slate-400 ml-2 animate-pulse" />
                </div>
              </div>

              {/* Decorative Corner Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-[60px] pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});