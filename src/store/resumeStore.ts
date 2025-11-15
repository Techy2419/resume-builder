import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Resume, ResumeData, ResumeStyle } from '../types/resume';

interface ResumeStore {
  resume: Resume | null;
  setResume: (resume: Resume) => void;
  updateData: (data: Partial<ResumeData>) => void;
  updateStyle: (style: Partial<ResumeStyle>) => void;
  resetResume: () => void;
  loadFromJSON: (json: string) => void;
  exportToJSON: () => string;
}

const defaultStyle: ResumeStyle = {
  template: 'modern',
  fontFamily: 'Arial, sans-serif',
  fontSize: 11,
  lineHeight: 1.4,
  margins: {
    top: 0.5,
    right: 0.5,
    bottom: 0.5,
    left: 0.5,
  },
  colors: {
    primary: '#0284c7',
    text: '#1f2937',
    headings: '#111827',
  },
  spacing: {
    sectionGap: 16,
    itemGap: 12,
  },
};

const defaultData: ResumeData = {
  personal: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  customSections: [],
  sectionOrder: [
    { id: 'personal', type: 'personal', title: 'Personal Info', enabled: true, order: 0 },
    { id: 'summary', type: 'summary', title: 'Professional Summary', enabled: true, order: 1 },
    { id: 'experience', type: 'experience', title: 'Work Experience', enabled: true, order: 2 },
    { id: 'education', type: 'education', title: 'Education', enabled: true, order: 3 },
    { id: 'skills', type: 'skills', title: 'Skills', enabled: true, order: 4 },
    { id: 'projects', type: 'projects', title: 'Projects', enabled: false, order: 5 },
    { id: 'certifications', type: 'certifications', title: 'Certifications', enabled: false, order: 6 },
  ],
};

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      resume: {
        id: crypto.randomUUID(),
        data: defaultData,
        style: defaultStyle,
        lastModified: new Date(),
      },

      setResume: (resume) => set({ resume }),

      updateData: (data) => set((state) => ({
        resume: state.resume
          ? {
              ...state.resume,
              data: { ...state.resume.data, ...data },
              lastModified: new Date(),
            }
          : null,
      })),

      updateStyle: (style) => set((state) => ({
        resume: state.resume
          ? {
              ...state.resume,
              style: { ...state.resume.style, ...style },
              lastModified: new Date(),
            }
          : null,
      })),

      resetResume: () => set({
        resume: {
          id: crypto.randomUUID(),
          data: defaultData,
          style: defaultStyle,
          lastModified: new Date(),
        },
      }),

      loadFromJSON: (json) => {
        try {
          const parsed = JSON.parse(json);
          set({ resume: { ...parsed, lastModified: new Date(parsed.lastModified) } });
        } catch (error) {
          console.error('Failed to parse JSON:', error);
        }
      },

      exportToJSON: () => {
        const { resume } = get();
        return JSON.stringify(resume, null, 2);
      },
    }),
    {
      name: 'resume-storage',
    }
  )
);
