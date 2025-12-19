import { lazy, Suspense } from 'react';
import { Navigation } from './components/layout/Navigation';
import { Hero } from './components/sections/Hero';

// Lazy load sections below the fold for better performance
const Offer = lazy(() => import('./components/sections/Offer').then(m => ({ default: m.Offer })));
const Match = lazy(() => import('./components/sections/Match').then(m => ({ default: m.Match })));
const About = lazy(() => import('./components/sections/About').then(m => ({ default: m.About })));
const Skills = lazy(() => import('./components/sections/Skills').then(m => ({ default: m.Skills })));
const Timeline = lazy(() => import('./components/sections/Timeline').then(m => ({ default: m.Timeline })));
const Projects = lazy(() => import('./components/sections/Projects').then(m => ({ default: m.Projects })));
const Deployment = lazy(() => import('./components/sections/Deployment').then(m => ({ default: m.Deployment })));
const Testimonials = lazy(() => import('./components/sections/Testimonials').then(m => ({ default: m.Testimonials })));
const Commute = lazy(() => import('./components/sections/Commute').then(m => ({ default: m.Commute })));
const Contact = lazy(() => import('./components/sections/Contact').then(m => ({ default: m.Contact })));

function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-primary-100 selection:text-primary-900">
      <Navigation />

      <main>
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <Offer />
          <Match />
          <About />
          <Skills />
          <Timeline />
          <Projects />
          <Deployment />
          <Testimonials />
          <Commute />
        </Suspense>
      </main>

      <Suspense fallback={<SectionLoader />}>
        <Contact />
      </Suspense>
    </div>
  );
}

export default App;
