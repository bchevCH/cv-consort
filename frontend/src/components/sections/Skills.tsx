import { memo } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Shield, Database, Layers, Code, Brain, GitBranch, Cpu, Network, Activity, Server } from 'lucide-react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useContent } from '@/hooks/useContent';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { staggerContainer, fadeInUp } from '@/hooks/useScrollAnimation';
import type { MainSkill } from '@/data/types';

type SkillIconKey = 'cloud' | 'code' | 'shield' | 'database' | 'brain' | 'server' | 'network' | 'activity';
type SkillLevel = MainSkill['level'];

const iconMap: Record<SkillIconKey, ReactNode> = {
  cloud: <Cloud className="w-8 h-8" />,
  code: <Code className="w-8 h-8" />,
  shield: <Shield className="w-8 h-8" />,
  database: <Database className="w-8 h-8" />,
  brain: <Brain className="w-8 h-8" />,
  server: <Server className="w-8 h-8" />,
  network: <Network className="w-8 h-8" />,
  activity: <Activity className="w-8 h-8" />,
};

const getIcon = (key: string): ReactNode => {
  return iconMap[key as SkillIconKey] ?? <Layers className="w-8 h-8" />;
};

const levelColors: Record<SkillLevel, string> = {
  'Expert': 'bg-emerald-500',
  'Avancé': 'bg-primary-500',
  'Intermédiaire': 'bg-slate-400'
};

interface LevelIndicatorProps {
  level: SkillLevel;
}

const LevelIndicator = memo<LevelIndicatorProps>(function LevelIndicator({ level }) {
  return (
    <div className="flex items-center gap-1.5">
       <span className={`w-2 h-2 rounded-full ${levelColors[level]}`} />
       <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{level}</span>
    </div>
  );
});

export const Skills = memo(function Skills() {
  const { t } = useTranslation('common');
  const content = useContent();
  const { skills } = content;

  return (
    <section id="skills" className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title={skills.title} 
          subtitle={skills.subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {skills.groups.map((group) => (
            <motion.div
              key={group.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="h-full">
                <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden h-full hover:shadow-lg hover:border-primary-200 transition-all duration-300">
                  {/* Header */}
                  <div className="p-4 sm:p-6 border-b border-slate-200 bg-white">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary-50 rounded-xl text-primary-600">
                         {getIcon(group.icon)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-1">{group.name}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">{group.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Main Skills (The Pillars) */}
                  <div className="p-4 sm:p-6 bg-slate-50/50">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center">
                      <Cpu className="w-4 h-4 mr-2" />
                      {t('skills.keySkills')}
                    </h4>
                    <div className="grid gap-3">
                      {group.mainSkills.map((skill, i) => (
                        <div key={i} className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                          <span className="font-bold text-slate-800">{skill.name}</span>
                          <LevelIndicator level={skill.level} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ecosystem (The Tools) */}
                  <div className="p-4 sm:p-6 border-t border-slate-200 bg-white">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center">
                      <GitBranch className="w-4 h-4 mr-2" />
                      {t('skills.ecosystem')}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {group.ecosystem.map((tool, i) => (
                        <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-600 text-sm rounded-md font-medium border border-slate-200 hover:bg-slate-200 transition-colors cursor-default">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});