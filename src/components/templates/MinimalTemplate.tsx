import React from 'react';
import type { Resume } from '../../types/resume';

interface TemplateProps {
  resume: Resume;
}

export const MinimalTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { data, style } = resume;

  // Reuse ClassicTemplate logic but with minimal styling
  return <div style={{ fontFamily: style.fontFamily, fontSize: `${style.fontSize}pt` }}>
    {/* Simplified version - similar to Classic but even more minimal */}
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold">{data.personal.fullName}</h1>
        <div className="text-xs">{data.personal.email} • {data.personal.phone}</div>
      </div>
      {data.summary && <p className="text-sm">{data.summary}</p>}
      {/* Add other sections similarly */}
    </div>
  </div>;
};
