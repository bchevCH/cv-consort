import { memo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderGit2, CheckCircle2, Lock, Terminal, Star, Github, PlayCircle, ExternalLink, Briefcase, LayoutDashboard, ShieldCheck, Brain, Globe, X, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import type { ReactNode, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useContent } from '@/hooks/useContent';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { fadeInUp } from '@/hooks/useScrollAnimation';

interface LightboxState {
  images: string[];
  currentIndex: number;
}

type ProjectIconKey = 'layout' | 'shield' | 'brain' | 'code' | 'globe' | 'briefcase' | 'default';

interface ImageCarouselProps {
  images: string[];
  projectName: string;
  isNeoStack: boolean;
  onImageClick: (images: string[], index: number) => void;
}

const ImageCarousel = memo<ImageCarouselProps>(function ImageCarousel({
  images,
  projectName,
  isNeoStack,
  onImageClick
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageCount = images.length;

  const nextImage = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % imageCount);
  }, [imageCount]);

  const prevImage = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + imageCount) % imageCount);
  }, [imageCount]);

  const goToImage = useCallback((e: MouseEvent, index: number) => {
    e.stopPropagation();
    setCurrentIndex(index);
  }, []);

  const handleContainerClick = useCallback(() => {
    onImageClick(images, currentIndex);
  }, [onImageClick, images, currentIndex]);

  return (
    <div
      className={`relative group cursor-pointer rounded-xl overflow-hidden border-2 ${
        isNeoStack
          ? 'border-slate-700 hover:border-blue-500'
          : 'border-slate-200 hover:border-primary-400'
      } transition-all duration-300 shadow-lg hover:shadow-2xl`}
      onClick={handleContainerClick}
    >
      {/* Browser-like header */}
      <div className={`flex items-center gap-2 px-4 py-2.5 ${
        isNeoStack ? 'bg-slate-800' : 'bg-slate-100'
      }`}>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className={`flex-1 text-center text-xs font-mono ${
          isNeoStack ? 'text-slate-500' : 'text-slate-400'
        }`}>
          {projectName.toLowerCase().replace(/\s+/g, '-')}.app
        </div>
        <Maximize2 className={`w-4 h-4 ${
          isNeoStack ? 'text-slate-600' : 'text-slate-400'
        } group-hover:text-blue-500 transition-colors`} />
      </div>

      {/* Screenshot with carousel */}
      <div className="relative overflow-hidden">
        <img
          src={images[currentIndex]}
          alt={`${projectName} preview ${currentIndex + 1}`}
          className="w-full h-auto object-cover"
        />

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className={`absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                isNeoStack ? 'bg-slate-900/80 text-white hover:bg-slate-800' : 'bg-white/80 text-slate-700 hover:bg-white'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                isNeoStack ? 'bg-slate-900/80 text-white hover:bg-slate-800' : 'bg-white/80 text-slate-700 hover:bg-white'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

      </div>

      {/* Dots indicator */}
      {imageCount > 1 && (
        <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 ${
          isNeoStack ? 'bg-slate-900/70' : 'bg-white/70'
        } px-3 py-1.5 rounded-full`}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => goToImage(e, i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIndex
                  ? isNeoStack ? 'bg-blue-500 w-4' : 'bg-primary-500 w-4'
                  : isNeoStack ? 'bg-slate-500 hover:bg-slate-400' : 'bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
});

const iconMap: Record<ProjectIconKey, ReactNode> = {
  layout: <LayoutDashboard className="w-8 h-8" />,
  shield: <ShieldCheck className="w-8 h-8" />,
  brain: <Brain className="w-8 h-8" />,
  code: <Terminal className="w-8 h-8" />,
  globe: <Globe className="w-8 h-8" />,
  briefcase: <Briefcase className="w-8 h-8" />,
  default: <FolderGit2 className="w-8 h-8" />
};

const getIcon = (key: string | undefined): ReactNode => {
  if (key && key in iconMap) {
    return iconMap[key as ProjectIconKey];
  }
  return iconMap.default;
};

export const Projects = memo(function Projects() {
  const { t } = useTranslation('common');
  const content = useContent();
  const { projects } = content;
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  const openLightbox = useCallback((images: string[], index: number) => {
    setLightbox({ images, currentIndex: index });
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const nextLightboxImage = useCallback(() => {
    setLightbox(prev => {
      if (!prev) return null;
      return {
        ...prev,
        currentIndex: (prev.currentIndex + 1) % prev.images.length
      };
    });
  }, []);

  const prevLightboxImage = useCallback(() => {
    setLightbox(prev => {
      if (!prev) return null;
      return {
        ...prev,
        currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length
      };
    });
  }, []);

  const goToLightboxImage = useCallback((index: number) => {
    setLightbox(prev => {
      if (!prev) return null;
      return { ...prev, currentIndex: index };
    });
  }, []);

  const openExternalLink = useCallback((url: string) => {
    window.open(url, '_blank');
  }, []);

  return (
    <section id="projects" className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle title={projects.title} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {projects.items.map((project) => {
            const isNeoStack = project.id === 'neostack';
            
            return (
              <motion.div
                key={project.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className={`${isNeoStack ? 'lg:col-span-2' : ''}`}
              >
                <div 
                  className={`
                    h-full flex flex-col relative overflow-hidden rounded-2xl transition-all duration-300 border
                    ${isNeoStack 
                      ? 'bg-slate-950 border-slate-800 shadow-2xl' 
                      : 'bg-white border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1'
                    }
                  `}
                >
                  {/* Decorative Background for NeoStack - Adjusted for dark mode contrast */}
                  {isNeoStack && (
                    <>
                      {/* Deep, dark gradients that don't wash out text */}
                      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none mix-blend-screen" />
                      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-900/20 rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none mix-blend-screen" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950 pointer-events-none" />
                    </>
                  )}

                  <div className={`p-4 sm:p-6 md:p-10 relative z-10 flex flex-col h-full`}>
                    
                    {/* Header */}
                    <div className="flex items-start justify-between gap-6 mb-8">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4 flex-wrap">
                          {isNeoStack && (
                             <span className="flex items-center text-xs font-bold px-3 py-1 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-900/50 border border-blue-400/30">
                              <Star className="w-3 h-3 mr-1.5 fill-current" /> {t('projects.flagship')}
                            </span>
                          )}
                          {project.confidential && (
                            <span className="flex items-center text-xs font-bold px-2.5 py-1 rounded bg-amber-50 text-amber-700 border border-amber-200">
                              <Lock className="w-3 h-3 mr-1" /> {t('labels.confidential')}
                            </span>
                          )}
                        </div>
                        
                        <h3 className={`text-3xl md:text-4xl font-bold tracking-tight mb-2 ${isNeoStack ? 'text-white' : 'text-slate-900'}`}>
                          {project.name}
                        </h3>
                        
                        <p className={`text-lg font-medium ${isNeoStack ? 'text-blue-200' : 'text-primary-600'}`}>
                          {project.tagline}
                        </p>
                      </div>

                      <div className={`p-4 rounded-2xl flex-shrink-0 ${
                        isNeoStack
                          ? 'bg-slate-800/50 backdrop-blur-md text-white border border-slate-700'
                          : 'bg-slate-50 text-slate-600'
                      }`}>
                         {getIcon(project.icon)}
                      </div>
                    </div>
                    
                    {/* Divider */}
                    <div className={`h-px w-full mb-8 ${isNeoStack ? 'bg-slate-800' : 'bg-slate-100'}`} />
                    
                    {/* Description */}
                    <p className={`leading-relaxed mb-10 text-lg ${isNeoStack ? 'text-slate-300' : 'text-slate-600'}`}>
                      {project.description}
                    </p>

                    {/* Preview Screenshots (Carousel) */}
                    {project.previews && project.previews.length > 0 && (
                      <div className="mb-10">
                        <ImageCarousel
                          images={project.previews}
                          projectName={project.name}
                          isNeoStack={isNeoStack}
                          onImageClick={openLightbox}
                        />
                      </div>
                    )}

                    {/* NeoStack Specific: Large Metrics */}
                    {isNeoStack && project.metrics && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                        {project.metrics.map((metric, i) => (
                          <div 
                            key={i} 
                            className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl text-center hover:bg-slate-800/50 transition-colors"
                          >
                            <div className="text-3xl font-bold text-white mb-1">
                              {metric.value}
                            </div>
                            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Features List */}
                    {project.features && (
                      <div className={`mb-6 sm:mb-10 p-4 sm:p-6 rounded-2xl border ${
                        isNeoStack ? 'bg-slate-900/30 border-slate-800' : 'bg-slate-50/50 border-slate-100'
                      }`}>
                        <h4 className={`text-xs font-bold uppercase tracking-wider mb-5 ${isNeoStack ? 'text-slate-500' : 'text-slate-400'}`}>
                          {t('projects.keyFeatures')}
                        </h4>
                        <div className="grid md:grid-cols-2 gap-y-4 gap-x-8">
                          {project.features.map((feature, i) => (
                            <div key={i} className="flex items-start text-sm group/feature">
                              <CheckCircle2 className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
                                isNeoStack ? 'text-blue-500' : 'text-primary-600'
                              }`} />
                              <span className={`font-medium ${isNeoStack ? 'text-slate-300' : 'text-slate-700'}`}>
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Components (for FBT) */}
                    {project.components && (
                      <div className="grid md:grid-cols-2 gap-4 mb-8">
                        {project.components.map((comp, i) => (
                          <div key={i} className="bg-slate-50 p-5 rounded-xl border border-slate-100 hover:border-primary-200 transition-colors">
                            <h4 className="font-bold text-slate-900 mb-1.5">{comp.name}</h4>
                            <p className="text-xs text-slate-500 mb-3">{comp.description}</p>
                            <ul className="space-y-2">
                              {comp.features.map((f, j) => (
                                <li key={j} className="text-xs text-slate-700 flex items-center font-medium">
                                  <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2" />
                                  {f}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Other Project Content (Infrastructure, Categories) */}
                    {project.infrastructure && (
                      <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 mb-8">
                         <div className="flex items-center gap-2 mb-4 text-slate-900 font-bold text-sm border-b border-slate-200 pb-2">
                          <Terminal className="w-4 h-4 text-primary-600" />
                          {t('projects.infraSpecs')}
                        </div>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                          {Object.entries(project.infrastructure).map(([key, value]) => (
                            <div key={key} className="flex flex-col">
                              <span className="text-xs text-slate-400 uppercase font-semibold mb-0.5">{key}</span>
                              <span className="text-slate-700 font-mono text-xs bg-slate-100 inline-block py-0.5 px-1.5 rounded w-fit">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {project.categories && (
                      <div className="grid md:grid-cols-3 gap-4 mb-8">
                        {project.categories.map((cat, i) => (
                          <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <h4 className="font-bold text-slate-900 text-sm mb-1">{cat.name}</h4>
                            <p className="text-xs text-slate-500 leading-relaxed">{cat.description}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Footer - Tech Stack & Links */}
                    <div className="mt-auto flex flex-col md:flex-row gap-6 md:items-end justify-between">
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2">
                          {project.stack?.map(tech => (
                            <span 
                              key={tech} 
                              className={`text-xs py-1.5 px-3 rounded-md font-medium border transition-colors ${
                                isNeoStack 
                                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:border-blue-500' 
                                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-primary-300 hover:text-primary-700'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {project.links && project.links.length > 0 && (
                        <div className="flex gap-3">
                          {project.links.map((link, i) => (
                            <Button
                              key={i}
                              variant={isNeoStack ? "primary" : "secondary"}
                              size="sm"
                              className={isNeoStack ? "bg-blue-600 hover:bg-blue-500 text-white border-none" : ""}
                              onClick={() => openExternalLink(link.url)}
                            >
                              {link.type === 'github' && <Github className="w-4 h-4 mr-2" />}
                              {link.type === 'video' && <PlayCircle className="w-4 h-4 mr-2" />}
                              {link.type === 'website' && <ExternalLink className="w-4 h-4 mr-2" />}
                              {link.label}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative max-w-7xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute -top-14 right-0 p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/70 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Navigation arrows */}
              {lightbox.images.length > 1 && (
                <>
                  <button
                    onClick={prevLightboxImage}
                    className="absolute left-[-60px] top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </button>
                  <button
                    onClick={nextLightboxImage}
                    className="absolute right-[-60px] top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  >
                    <ChevronRight className="w-8 h-8" />
                  </button>
                </>
              )}

              {/* Browser frame */}
              <div className="rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-800">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 text-center text-sm font-mono text-slate-400">
                    {lightbox.currentIndex + 1} / {lightbox.images.length}
                  </div>
                </div>
                <img
                  src={lightbox.images[lightbox.currentIndex]}
                  alt="Preview"
                  className="w-full h-auto max-h-[80vh] object-contain bg-slate-900"
                />
              </div>

              {/* Dots indicator */}
              {lightbox.images.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {lightbox.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToLightboxImage(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === lightbox.currentIndex
                          ? 'bg-white w-4'
                          : 'bg-white/40 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
});