import React, { useState } from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { Plus, Trash2, Sparkles } from 'lucide-react';
import { improveBulletPoint } from '../../lib/gemini';
import type { WorkExperience } from '../../types/resume';

export const ExperienceEditor: React.FC = () => {
  const { resume, updateData } = useResumeStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [improvingId, setImprovingId] = useState<string | null>(null);

  if (!resume) return null;

  const { experience } = resume.data;

  const addExperience = () => {
    const newExp: WorkExperience = {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      achievements: [''],
    };

    updateData({
      experience: [...experience, newExp],
    });
    setExpandedId(newExp.id);
  };

  const updateExperience = (id: string, field: string, value: any) => {
    updateData({
      experience: experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const deleteExperience = (id: string) => {
    updateData({
      experience: experience.filter((exp) => exp.id !== id),
    });
  };

  const addAchievement = (expId: string) => {
    const exp = experience.find((e) => e.id === expId);
    if (exp) {
      updateExperience(expId, 'achievements', [...exp.achievements, '']);
    }
  };

  const updateAchievement = (expId: string, index: number, value: string) => {
    const exp = experience.find((e) => e.id === expId);
    if (exp) {
      const newAchievements = [...exp.achievements];
      newAchievements[index] = value;
      updateExperience(expId, 'achievements', newAchievements);
    }
  };

  const deleteAchievement = (expId: string, index: number) => {
    const exp = experience.find((e) => e.id === expId);
    if (exp && exp.achievements.length > 1) {
      updateExperience(
        expId,
        'achievements',
        exp.achievements.filter((_, i) => i !== index)
      );
    }
  };

  const handleImproveAchievement = async (expId: string, index: number) => {
    const exp = experience.find((e) => e.id === expId);
    if (!exp || !exp.achievements[index]) return;

    const achievementId = `${expId}-${index}`;
    setImprovingId(achievementId);

    try {
      const improved = await improveBulletPoint(exp.achievements[index]);
      updateAchievement(expId, index, improved);
    } catch (error: any) {
      alert(error.message || 'Failed to improve bullet point. Please check your AI configuration in Settings.');
    } finally {
      setImprovingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Work Experience</h2>
        <Button onClick={addExperience} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {experience.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No work experience added yet.</p>
          <p className="text-sm mt-2">Click "Add Experience" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {experience.map((exp) => (
            <div
              key={exp.id}
              className="border border-gray-200 rounded-lg p-4 bg-white"
            >
              <div className="flex justify-between items-start mb-3">
                <button
                  onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                  className="text-left flex-1"
                >
                  <h3 className="font-semibold text-gray-900">
                    {exp.position || 'New Position'} {exp.company && `at ${exp.company}`}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate || 'End Date'}
                  </p>
                </button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteExperience(exp.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
              </div>

              {expandedId === exp.id && (
                <div className="space-y-3 mt-4 pt-4 border-t">
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="Position *"
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                      placeholder="Software Engineer"
                    />
                    <Input
                      label="Company *"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      placeholder="Tech Corp"
                    />
                  </div>

                  <Input
                    label="Location"
                    value={exp.location}
                    onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                    placeholder="San Francisco, CA"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="Start Date *"
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    />
                    <Input
                      label="End Date"
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      disabled={exp.current}
                    />
                  </div>

                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                      className="mr-2"
                    />
                    I currently work here
                  </label>

                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700">
                        Key Achievements & Responsibilities
                      </label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addAchievement(exp.id)}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Add
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {exp.achievements.map((achievement, index) => (
                        <div key={index} className="flex gap-2">
                          <Textarea
                            value={achievement}
                            onChange={(e) => updateAchievement(exp.id, index, e.target.value)}
                            placeholder="Led team of 5 engineers to develop..."
                            rows={2}
                            className="flex-1"
                          />
                          <div className="flex flex-col gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              title="AI Enhance"
                              onClick={() => handleImproveAchievement(exp.id, index)}
                              disabled={!achievement || improvingId === `${exp.id}-${index}`}
                            >
                              <Sparkles className={`w-4 h-4 ${improvingId === `${exp.id}-${index}` ? 'animate-spin' : ''}`} />
                            </Button>
                            {exp.achievements.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteAchievement(exp.id, index)}
                              >
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
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
