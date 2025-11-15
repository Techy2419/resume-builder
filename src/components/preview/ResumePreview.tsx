import React from 'react';
import type { Resume } from '../../types/resume';
import { ModernTemplate } from '../templates/ModernTemplate';
import { ClassicTemplate } from '../templates/ClassicTemplate';
import { MinimalTemplate } from '../templates/MinimalTemplate';
import { ProfessionalTemplate } from '../templates/ProfessionalTemplate';

interface ResumePreviewProps {
  resume: Resume;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ resume }) => {
  const renderTemplate = () => {
    switch (resume.style.template) {
      case 'modern':
        return <ModernTemplate resume={resume} />;
      case 'classic':
        return <ClassicTemplate resume={resume} />;
      case 'minimal':
        return <MinimalTemplate resume={resume} />;
      case 'professional':
        return <ProfessionalTemplate resume={resume} />;
      default:
        return <ModernTemplate resume={resume} />;
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-700">Preview</h2>
      </div>
      <div
        id="resume-preview"
        className="p-8 overflow-auto"
        style={{
          minHeight: '11in',
          maxWidth: '8.5in',
          margin: '0 auto'
        }}
      >
        {renderTemplate()}
      </div>
    </div>
  );
};
