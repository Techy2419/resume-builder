import React from 'react';
import type { Resume } from '../../types/resume';

interface TemplateProps {
  resume: Resume;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { data, style } = resume;
  const { personal, summary, experience, education, skills, projects, certifications, sectionOrder } = data;

  const getSectionComponent = (type: string) => {
    switch (type) {
      case 'personal':
        return (
          <div key="personal" className="text-center border-b-2 pb-4 mb-6" style={{ borderColor: style.colors.primary }}>
            <h1 className="text-3xl font-bold mb-2" style={{ color: style.colors.headings }}>
              {personal.fullName}
            </h1>
            <div className="flex flex-wrap justify-center gap-3 text-sm" style={{ color: style.colors.text }}>
              {personal.email && <span>{personal.email}</span>}
              {personal.phone && <span>•</span>}
              {personal.phone && <span>{personal.phone}</span>}
              {personal.location && <span>•</span>}
              {personal.location && <span>{personal.location}</span>}
            </div>
            <div className="flex flex-wrap justify-center gap-3 text-sm mt-2">
              {personal.linkedin && (
                <a href={personal.linkedin} className="hover:underline" style={{ color: style.colors.primary }}>
                  LinkedIn
                </a>
              )}
              {personal.github && (
                <a href={personal.github} className="hover:underline" style={{ color: style.colors.primary }}>
                  GitHub
                </a>
              )}
              {personal.website && (
                <a href={personal.website} className="hover:underline" style={{ color: style.colors.primary }}>
                  Website
                </a>
              )}
            </div>
          </div>
        );

      case 'summary':
        if (!summary) return null;
        return (
          <div key="summary" className="mb-6">
            <h2 className="text-xl font-bold mb-3 pb-1 border-b" style={{ color: style.colors.headings, borderColor: style.colors.primary }}>
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: style.colors.text }}>
              {summary}
            </p>
          </div>
        );

      case 'experience':
        if (experience.length === 0) return null;
        return (
          <div key="experience" className="mb-6">
            <h2 className="text-xl font-bold mb-3 pb-1 border-b" style={{ color: style.colors.headings, borderColor: style.colors.primary }}>
              WORK EXPERIENCE
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-base" style={{ color: style.colors.headings }}>
                      {exp.position}
                    </h3>
                    <span className="text-sm text-gray-600">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-sm mb-2" style={{ color: style.colors.primary }}>
                    {exp.company} • {exp.location}
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-sm" style={{ color: style.colors.text }}>
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case 'education':
        if (education.length === 0) return null;
        return (
          <div key="education" className="mb-6">
            <h2 className="text-xl font-bold mb-3 pb-1 border-b" style={{ color: style.colors.headings, borderColor: style.colors.primary }}>
              EDUCATION
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-base" style={{ color: style.colors.headings }}>
                      {edu.degree} in {edu.field}
                    </h3>
                    <span className="text-sm text-gray-600">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  <div className="text-sm mb-1" style={{ color: style.colors.primary }}>
                    {edu.school} • {edu.location}
                  </div>
                  {edu.gpa && (
                    <div className="text-sm text-gray-600">GPA: {edu.gpa}</div>
                  )}
                  {edu.achievements.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-sm mt-1" style={{ color: style.colors.text }}>
                      {edu.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'skills':
        if (skills.length === 0) return null;
        return (
          <div key="skills" className="mb-6">
            <h2 className="text-xl font-bold mb-3 pb-1 border-b" style={{ color: style.colors.headings, borderColor: style.colors.primary }}>
              SKILLS
            </h2>
            <div className="space-y-2">
              {skills.map((skillGroup, idx) => (
                <div key={idx}>
                  <span className="font-semibold text-sm" style={{ color: style.colors.headings }}>
                    {skillGroup.category}:{' '}
                  </span>
                  <span className="text-sm" style={{ color: style.colors.text }}>
                    {skillGroup.items.join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        if (projects.length === 0) return null;
        return (
          <div key="projects" className="mb-6">
            <h2 className="text-xl font-bold mb-3 pb-1 border-b" style={{ color: style.colors.headings, borderColor: style.colors.primary }}>
              PROJECTS
            </h2>
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.id}>
                  <h3 className="font-bold text-base" style={{ color: style.colors.headings }}>
                    {project.name}
                    {project.link && (
                      <a href={project.link} className="text-sm ml-2 hover:underline" style={{ color: style.colors.primary }}>
                        [Link]
                      </a>
                    )}
                  </h3>
                  <p className="text-sm mb-1" style={{ color: style.colors.text }}>
                    {project.description}
                  </p>
                  <div className="text-sm mb-1" style={{ color: style.colors.primary }}>
                    Technologies: {project.technologies.join(', ')}
                  </div>
                  {project.highlights.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-sm" style={{ color: style.colors.text }}>
                      {project.highlights.map((highlight, idx) => (
                        <li key={idx}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'certifications':
        if (certifications.length === 0) return null;
        return (
          <div key="certifications" className="mb-6">
            <h2 className="text-xl font-bold mb-3 pb-1 border-b" style={{ color: style.colors.headings, borderColor: style.colors.primary }}>
              CERTIFICATIONS
            </h2>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="text-sm">
                  <span className="font-semibold" style={{ color: style.colors.headings }}>
                    {cert.name}
                  </span>
                  {' - '}
                  <span style={{ color: style.colors.text }}>{cert.issuer}</span>
                  {' • '}
                  <span className="text-gray-600">{cert.date}</span>
                  {cert.link && (
                    <a href={cert.link} className="ml-2 hover:underline" style={{ color: style.colors.primary }}>
                      [Verify]
                    </a>
                  )}
                </div>
              ))}
            </div>
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
      className="max-w-4xl mx-auto bg-white"
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
