import React, { useState } from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { Plus, Trash2 } from 'lucide-react';
import type { Project } from '../../types/resume';

export const ProjectsEditor: React.FC = () => {
  const { resume, updateData } = useResumeStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!resume) return null;

  const { projects } = resume.data;

  const addProject = () => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: '',
      description: '',
      technologies: [],
      highlights: [''],
    };

    updateData({
      projects: [...projects, newProject],
    });
    setExpandedId(newProject.id);
  };

  const updateProject = (id: string, field: string, value: any) => {
    updateData({
      projects: projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      ),
    });
  };

  const deleteProject = (id: string) => {
    updateData({
      projects: projects.filter((proj) => proj.id !== id),
    });
  };

  const addHighlight = (projId: string) => {
    const proj = projects.find((p) => p.id === projId);
    if (proj) {
      updateProject(projId, 'highlights', [...proj.highlights, '']);
    }
  };

  const updateHighlight = (projId: string, index: number, value: string) => {
    const proj = projects.find((p) => p.id === projId);
    if (proj) {
      const newHighlights = [...proj.highlights];
      newHighlights[index] = value;
      updateProject(projId, 'highlights', newHighlights);
    }
  };

  const deleteHighlight = (projId: string, index: number) => {
    const proj = projects.find((p) => p.id === projId);
    if (proj && proj.highlights.length > 1) {
      updateProject(
        projId,
        'highlights',
        proj.highlights.filter((_, i) => i !== index)
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Projects</h2>
        <Button onClick={addProject} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
        <p className="text-sm text-blue-800">
          💡 Include relevant projects that demonstrate your skills, especially if you're early in your career or changing fields.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No projects added yet.</p>
          <p className="text-sm mt-2">Click "Add Project" to showcase your work.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border border-gray-200 rounded-lg p-4 bg-white"
            >
              <div className="flex justify-between items-start mb-3">
                <button
                  onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
                  className="text-left flex-1"
                >
                  <h3 className="font-semibold text-gray-900">
                    {project.name || 'New Project'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {project.technologies.length > 0
                      ? project.technologies.join(', ')
                      : 'No technologies added'}
                  </p>
                </button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteProject(project.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
              </div>

              {expandedId === project.id && (
                <div className="space-y-3 mt-4 pt-4 border-t">
                  <Input
                    label="Project Name *"
                    value={project.name}
                    onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                    placeholder="E-commerce Platform"
                  />

                  <Textarea
                    label="Description *"
                    value={project.description}
                    onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                    placeholder="A full-stack e-commerce platform with real-time inventory management..."
                    rows={3}
                  />

                  <Input
                    label="Technologies (comma-separated) *"
                    value={project.technologies.join(', ')}
                    onChange={(e) =>
                      updateProject(
                        project.id,
                        'technologies',
                        e.target.value.split(',').map((t) => t.trim()).filter((t) => t)
                      )
                    }
                    placeholder="React, Node.js, PostgreSQL, AWS"
                  />

                  <Input
                    label="Project Link (optional)"
                    value={project.link || ''}
                    onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                    placeholder="https://github.com/username/project"
                  />

                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700">
                        Key Highlights
                      </label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addHighlight(project.id)}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Add
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {project.highlights.map((highlight, index) => (
                        <div key={index} className="flex gap-2">
                          <Textarea
                            value={highlight}
                            onChange={(e) => updateHighlight(project.id, index, e.target.value)}
                            placeholder="Implemented real-time chat feature serving 10K+ users..."
                            rows={2}
                            className="flex-1"
                          />
                          {project.highlights.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteHighlight(project.id, index)}
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          )}
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
