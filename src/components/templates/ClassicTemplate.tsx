import React from 'react';
import type { Resume } from '../../types/resume';

interface TemplateProps {
  resume: Resume;
}

export const ClassicTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { data, style } = resume;
  const { personal, summary, experience, education, skills, projects, certifications, sectionOrder } = data;

  const getSectionComponent = (type: string) => {
    switch (type) {
      case 'personal':
        return (
          <div key="personal" className="mb-4">
            <h1 className="text-2xl font-bold text-center mb-2">{personal.fullName}</h1>
            <div className="text-center text-sm space-y-1">
              <div>{personal.email} | {personal.phone} | {personal.location}</div>
              {(personal.linkedin || personal.github || personal.website) && (
                <div className="space-x-2">
                  {personal.linkedin && <span>{personal.linkedin}</span>}
                  {personal.github && <span>{personal.github}</span>}
                  {personal.website && <span>{personal.website}</span>}
                </div>
              )}
            </div>
          </div>
        );

      case 'summary':
        if (!summary) return null;
        return (
          <div key="summary" className="mb-4">
            <h2 className="text-lg font-bold mb-2 uppercase">Summary</h2>
            <p className="text-sm">{summary}</p>
          </div>
        );

      case 'experience':
        if (experience.length === 0) return null;
        return (
          <div key="experience" className="mb-4">
            <h2 className="text-lg font-bold mb-2 uppercase">Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between">
                  <div className="font-bold">{exp.position}, {exp.company}</div>
                  <div className="text-sm">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</div>
                </div>
                <div className="text-sm italic mb-1">{exp.location}</div>
                <ul className="list-disc ml-5 text-sm space-y-0.5">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );

      case 'education':
        if (education.length === 0) return null;
        return (
          <div key="education" className="mb-4">
            <h2 className="text-lg font-bold mb-2 uppercase">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <div className="flex justify-between">
                  <div className="font-bold">{edu.degree} in {edu.field}</div>
                  <div className="text-sm">{edu.startDate} - {edu.endDate}</div>
                </div>
                <div className="text-sm">{edu.school}, {edu.location}</div>
                {edu.gpa && <div className="text-sm">GPA: {edu.gpa}</div>}
              </div>
            ))}
          </div>
        );

      case 'skills':
        if (skills.length === 0) return null;
        return (
          <div key="skills" className="mb-4">
            <h2 className="text-lg font-bold mb-2 uppercase">Skills</h2>
            {skills.map((skillGroup, idx) => (
              <div key={idx} className="text-sm mb-1">
                <span className="font-semibold">{skillGroup.category}: </span>
                {skillGroup.items.join(', ')}
              </div>
            ))}
          </div>
        );

      case 'projects':
        if (projects.length === 0) return null;
        return (
          <div key="projects" className="mb-4">
            <h2 className="text-lg font-bold mb-2 uppercase">Projects</h2>
            {projects.map((project) => (
              <div key={project.id} className="mb-2">
                <div className="font-bold">{project.name}</div>
                <div className="text-sm">{project.description}</div>
                <div className="text-sm italic">Technologies: {project.technologies.join(', ')}</div>
              </div>
            ))}
          </div>
        );

      case 'certifications':
        if (certifications.length === 0) return null;
        return (
          <div key="certifications" className="mb-4">
            <h2 className="text-lg font-bold mb-2 uppercase">Certifications</h2>
            {certifications.map((cert) => (
              <div key={cert.id} className="text-sm mb-1">
                {cert.name} - {cert.issuer} ({cert.date})
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const enabledSections = sectionOrder
    .filter(section => section.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <div
      style={{
        fontFamily: style.fontFamily,
        fontSize: `${style.fontSize}pt`,
        lineHeight: style.lineHeight,
        padding: `${style.margins.top}in ${style.margins.right}in ${style.margins.bottom}in ${style.margins.left}in`,
      }}
    >
      {enabledSections.map(section => getSectionComponent(section.type))}
    </div>
  );
};
