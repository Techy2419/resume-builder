import React from 'react';
import { Modal } from '../ui/Modal';
import { Check } from 'lucide-react';
import { useResumeStore } from '../../store/resumeStore';

interface TemplateSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TemplateSelectionModal: React.FC<TemplateSelectionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { resume, updateStyle } = useResumeStore();

  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and contemporary design with accent colors',
      preview: '/templates/modern-preview.png',
      features: ['Color accents', 'Section dividers', 'Modern typography'],
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional format preferred by conservative industries',
      preview: '/templates/classic-preview.png',
      features: ['Simple layout', 'Black & white', 'Traditional structure'],
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple and elegant with maximum readability',
      preview: '/templates/minimal-preview.png',
      features: ['Minimalist design', 'Maximum white space', 'Ultra clean'],
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Corporate style with subtle accents',
      preview: '/templates/professional-preview.png',
      features: ['Left accent bar', 'Professional tone', 'Corporate styling'],
    },
  ];

  const handleSelectTemplate = (templateId: string) => {
    updateStyle({ template: templateId as any });
    onClose();
  };

  const currentTemplate = resume?.style.template || 'modern';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Choose a Template" size="lg">
      <div className="space-y-4">
        <p className="text-gray-600">
          Select a template that best fits your industry and personal style. All templates are ATS-friendly.
        </p>

        <div className="grid grid-cols-2 gap-4">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => handleSelectTemplate(template.id)}
              className={`relative p-4 border-2 rounded-lg text-left transition hover:border-primary-500 ${
                currentTemplate === template.id
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200'
              }`}
            >
              {currentTemplate === template.id && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}

              <div className="mb-3">
                <h3 className="font-bold text-gray-900 mb-1">{template.name}</h3>
                <p className="text-sm text-gray-600">{template.description}</p>
              </div>

              <div className="space-y-1">
                {template.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                    <div className="w-1 h-1 bg-primary-600 rounded-full"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Template Preview Placeholder */}
              <div className="mt-3 h-32 bg-gray-100 rounded border border-gray-200 flex items-center justify-center">
                <span className="text-xs text-gray-400">Preview</span>
              </div>
            </button>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
          <p className="text-sm text-blue-800">
            <strong>💡 ATS Tip:</strong> All templates use clean, parseable formatting. The difference is purely visual - choose what looks best to you!
          </p>
        </div>
      </div>
    </Modal>
  );
};
