import React, { useState } from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Plus, Trash2 } from 'lucide-react';
import type { Education } from '../../types/resume';

export const EducationEditor: React.FC = () => {
  const { resume, updateData } = useResumeStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!resume) return null;

  const { education } = resume.data;

  const addEducation = () => {
    const newEdu: Education = {
      id: crypto.randomUUID(),
      school: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      achievements: [],
    };

    updateData({
      education: [...education, newEdu],
    });
    setExpandedId(newEdu.id);
  };

  const updateEducation = (id: string, field: string, value: any) => {
    updateData({
      education: education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const deleteEducation = (id: string) => {
    updateData({
      education: education.filter((edu) => edu.id !== id),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Education</h2>
        <Button onClick={addEducation} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No education added yet.</p>
          <p className="text-sm mt-2">Click "Add Education" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="border border-gray-200 rounded-lg p-4 bg-white"
            >
              <div className="flex justify-between items-start mb-3">
                <button
                  onClick={() => setExpandedId(expandedId === edu.id ? null : edu.id)}
                  className="text-left flex-1"
                >
                  <h3 className="font-semibold text-gray-900">
                    {edu.degree || 'New Degree'} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-sm text-gray-600">{edu.school || 'School Name'}</p>
                </button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteEducation(edu.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
              </div>

              {expandedId === edu.id && (
                <div className="space-y-3 mt-4 pt-4 border-t">
                  <Input
                    label="School/University *"
                    value={edu.school}
                    onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                    placeholder="University of California"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="Degree *"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      placeholder="Bachelor of Science"
                    />
                    <Input
                      label="Field of Study *"
                      value={edu.field}
                      onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                      placeholder="Computer Science"
                    />
                  </div>

                  <Input
                    label="Location"
                    value={edu.location}
                    onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                    placeholder="Berkeley, CA"
                  />

                  <div className="grid grid-cols-3 gap-3">
                    <Input
                      label="Start Date"
                      type="month"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                    />
                    <Input
                      label="End Date"
                      type="month"
                      value={edu.endDate}
                      onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                    />
                    <Input
                      label="GPA (Optional)"
                      value={edu.gpa || ''}
                      onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                      placeholder="3.8/4.0"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
