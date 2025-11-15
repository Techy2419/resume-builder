import React from 'react';
import type { Resume } from '../../types/resume';

interface TemplateProps {
  resume: Resume;
}

export const ProfessionalTemplate: React.FC<TemplateProps> = ({ resume }) => {
  // For now, just use the Modern template as base
  // Can be customized later
  const { data, style } = resume;

  return <div style={{ fontFamily: style.fontFamily, fontSize: `${style.fontSize}pt` }}>
    <div className="border-l-4 pl-4" style={{ borderColor: style.colors.primary }}>
      <h1 className="text-2xl font-bold">{data.personal.fullName}</h1>
      <div className="text-sm">{data.personal.email} | {data.personal.phone}</div>
    </div>
    {/* Add other sections */}
  </div>;
};
