import React from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { Input } from '../ui/Input';

export const PersonalInfoEditor: React.FC = () => {
  const { resume, updateData } = useResumeStore();

  if (!resume) return null;

  const { personal } = resume.data;

  const handleChange = (field: string, value: string) => {
    updateData({
      personal: {
        ...personal,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h2>

      <Input
        label="Full Name *"
        value={personal.fullName}
        onChange={(e) => handleChange('fullName', e.target.value)}
        placeholder="John Doe"
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Email *"
          type="email"
          value={personal.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="john@example.com"
        />
        <Input
          label="Phone *"
          type="tel"
          value={personal.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="+1 (555) 123-4567"
        />
      </div>

      <Input
        label="Location *"
        value={personal.location}
        onChange={(e) => handleChange('location', e.target.value)}
        placeholder="San Francisco, CA"
      />

      <div className="border-t pt-4 mt-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Optional Links</h3>

        <div className="space-y-3">
          <Input
            label="LinkedIn"
            value={personal.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="https://linkedin.com/in/yourprofile"
          />
          <Input
            label="GitHub"
            value={personal.github || ''}
            onChange={(e) => handleChange('github', e.target.value)}
            placeholder="https://github.com/yourusername"
          />
          <Input
            label="Website/Portfolio"
            value={personal.website || ''}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="https://yourwebsite.com"
          />
        </div>
      </div>
    </div>
  );
};
