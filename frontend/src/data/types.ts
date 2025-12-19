/**
 * TypeScript interfaces for CV content data.
 * These types define the structure of content.json (i18n translations).
 * The main export is AppData which contains all CV sections.
 */

export interface Meta {
  title: string;
  subtitle: string;
  domain: string;
  generatedAt: string;
}

export interface Profile {
  summary: string;
  traits: string[];
  availability: string;
  permit: string;
  avatar: string;
}

export interface Hero {
  name: string;
  title: string;
  tagline: string;
  description: string;
  cta: {
    primary: { text: string; anchor: string };
    secondary: { text: string; href: string };
  };
  stats: { value: string; label: string }[];
}

export interface Passion {
  title: string;
  description: string;
  icon: string;
}

export interface About {
  title: string;
  subtitle: string;
  description: string[];
  photos: string[];
  status: {
    label: string;
    value: string;
    icon: string;
  }[];
  growthFocus: {
    title: string;
    items: string[];
  };
  passions: Passion[];
}

export interface OfferPillar {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface JobAdSection {
  title: string;
  content: string | string[];
  isList?: boolean;
}

export interface JobAdDetail {
  label: string;
  value: string;
  icon: string;
}

export interface JobAd {
  header: string;
  subHeader: string;
  about: string;
  sections: JobAdSection[];
  details: JobAdDetail[];
  footer: string;
}

export interface Offer {
  title: string;
  subtitle: string;
  jobUrl?: string;
  company_context: string;
  team_context: string;
  engagement_context: string;
  jobAd: JobAd;
  pillars: OfferPillar[];
}

export type ProofType = 'experience' | 'project' | 'certification' | 'metric';

export interface MatchItem {
  requirement: string;
  response: string;
  proof: string;
  icon: string;
  proofType: ProofType;
  isBonus?: boolean;
  downloadUrl?: string;
  downloadLabel?: string;
}

export interface ProofTypeLabels {
  experience: string;
  project: string;
  certification: string;
  metric: string;
}

export interface Match {
  title: string;
  subtitle: string;
  requiredLabel: string;
  bonusLabel: string;
  proofTypes: ProofTypeLabels;
  items: MatchItem[];
}

export interface MainSkill {
  name: string;
  level: 'Expert' | 'Avancé' | 'Intermédiaire';
}

export interface SkillGroup {
  id: string;
  name: string;
  description: string;
  icon: string;
  mainSkills: MainSkill[];
  ecosystem: string[]; // List of related tools/technologies
}

export interface Skills {
  title: string;
  subtitle: string;
  groups: SkillGroup[];
}

export interface Experience {
  id: number;
  period: string;
  duration: string;
  company: string;
  role: string;
  location: string;
  type: string;
  highlights: string[];
  tags: string[];
}

export interface Timeline {
  title: string;
  totalExperience: string;
  experiences: Experience[];
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface ProjectComponent {
  name: string;
  description: string;
  features: string[];
  status?: string;
}

export interface ProjectCategory {
  name: string;
  description: string;
}

export interface ProjectLink {
  type: 'github' | 'video' | 'website';
  url: string;
  label: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon?: string;
  preview?: string; // URL to a screenshot/preview image (legacy single)
  previews?: string[]; // URLs to screenshot/preview images (carousel)
  metrics?: ProjectMetric[];
  stack?: string[];
  features?: string[];
  components?: ProjectComponent[];
  categories?: ProjectCategory[];
  infrastructure?: Record<string, string>;
  confidential?: boolean;
  links?: ProjectLink[];
}

export interface Projects {
  title: string;
  items: Project[];
}

export interface EducationItem {
  period: string;
  title: string;
  school: string;
  location: string;
  note: string;
}

export interface Language {
  name: string;
  level: string;
  detail?: string;
}

export interface Education {
  title: string;
  items: EducationItem[];
  languages: Language[];
}

export interface DeploymentStep {
  id: number;
  title: string;
  subtitle: string;
  components: string[];
  skill: string;
}

export interface DeploymentIntro {
  title: string;
  description: string;
}

export interface DeploymentResult {
  title: string;
  items: string[];
}

export interface DeploymentCta {
  text: string;
  url: string;
}

export interface Deployment {
  title: string;
  subtitle: string;
  intro?: DeploymentIntro;
  steps: DeploymentStep[];
  result?: DeploymentResult;
  cta?: DeploymentCta;
}

export interface Testimonial {
  author: string;
  role: string;
  relation: string;
  content: string;
  avatar?: string;
}

export interface Recommendation {
  company: string;
  date: string;
  author: string;
  role: string;
  excerpt: string;
  qualities: string[];
  downloadUrl?: string;
}

export interface Testimonials {
  title: string;
  recommendation?: Recommendation;
  items: Testimonial[];
}

export interface Reason {
  title: string;
  description: string;
  icon?: string;
}

export interface WhyConsort {
  title: string;
  reasons: Reason[];
}

export interface CommuteMode {
  type: 'bike' | 'car' | 'train';
  time: string;
  label: string;
  details: string;
  preferred?: boolean;
}

export interface Commute {
  title: string;
  subtitle: string;
  origin: string;
  destination: string;
  modes: CommuteMode[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  location: string;
  linkedin: string;
  github: string;
}

export interface AppData {
  meta: Meta;
  profile: Profile;
  hero: Hero;
  about: About;
  offer: Offer;
  match: Match;
  skills: Skills;
  timeline: Timeline;
  projects: Projects;
  education: Education;
  deployment: Deployment;
  testimonials: Testimonials;
  whyConsort: WhyConsort;
  commute: Commute;
  contact: ContactInfo;
}
