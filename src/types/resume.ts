export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
  github?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  achievements: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  highlights: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: {
    id: string;
    content: string;
  }[];
}

export type SectionType =
  | 'personal'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'custom';

export interface SectionConfig {
  id: string;
  type: SectionType;
  title: string;
  enabled: boolean;
  order: number;
}

export interface ResumeData {
  personal: PersonalInfo;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  customSections: CustomSection[];
  sectionOrder: SectionConfig[];
}

export interface ResumeStyle {
  template: 'classic' | 'modern' | 'minimal' | 'professional';
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  margins: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  colors: {
    primary: string;
    text: string;
    headings: string;
  };
  spacing: {
    sectionGap: number;
    itemGap: number;
  };
}

export interface Resume {
  id: string;
  data: ResumeData;
  style: ResumeStyle;
  lastModified: Date;
}

export interface ATSScore {
  overall: number;
  formatScore: number;
  keywordScore: number;
  sections: {
    name: string;
    score: number;
    issues: string[];
  }[];
  suggestions: string[];
  matchedKeywords: string[];
  missingKeywords: string[];
}
