import React from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Plus, Trash2 } from 'lucide-react';
import type { Skill } from '../../types/resume';

export const SkillsEditor: React.FC = () => {
  const { resume, updateData } = useResumeStore();

  if (!resume) return null;

  const { skills } = resume.data;

  const addSkillCategory = () => {
    const newSkill: Skill = {
      category: '',
      items: [''],
    };

    updateData({
      skills: [...skills, newSkill],
    });
  };

  const updateSkillCategory = (index: number, category: string) => {
    const newSkills = [...skills];
    newSkills[index].category = category;
    updateData({ skills: newSkills });
  };

  const updateSkillItems = (index: number, items: string) => {
    const newSkills = [...skills];
    newSkills[index].items = items.split(',').map(item => item.trim()).filter(item => item);
    updateData({ skills: newSkills });
  };

  const deleteSkillCategory = (index: number) => {
    updateData({
      skills: skills.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Skills</h2>
        <Button onClick={addSkillCategory} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
        <p className="text-sm text-blue-800">
          💡 Tip: Organize skills by category (e.g., Programming Languages, Frameworks, Tools).
          Separate items with commas.
        </p>
      </div>

      {skills.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No skills added yet.</p>
          <p className="text-sm mt-2">Click "Add Category" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 bg-white"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-3">
                  <Input
                    label="Category Name"
                    value={skill.category}
                    onChange={(e) => updateSkillCategory(index, e.target.value)}
                    placeholder="Programming Languages"
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteSkillCategory(index)}
                    className="mt-6"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>

                <Input
                  label="Skills (comma-separated)"
                  value={skill.items.join(', ')}
                  onChange={(e) => updateSkillItems(index, e.target.value)}
                  placeholder="JavaScript, Python, Java, C++"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
