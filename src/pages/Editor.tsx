import React, { useState } from 'react';
import { useResumeStore } from '../store/resumeStore';
import { ResumePreview } from '../components/preview/ResumePreview';
import { PersonalInfoEditor } from '../components/editor/PersonalInfoEditor';
import { ExperienceEditor } from '../components/editor/ExperienceEditor';
import { EducationEditor } from '../components/editor/EducationEditor';
import { SkillsEditor } from '../components/editor/SkillsEditor';
import { StyleCustomizer } from '../components/editor/StyleCustomizer';
import { Button } from '../components/ui/Button';
import { Download, Settings, Sparkles, FileUp } from 'lucide-react';
import { exportToPDF } from '../utils/pdfExport';

export const Editor: React.FC = () => {
  const { resume } = useResumeStore();
  const [activeTab, setActiveTab] = useState<'content' | 'style'>('content');
  const [activeSection, setActiveSection] = useState('personal');

  if (!resume) return null;

  const handleExportPDF = async () => {
    await exportToPDF(resume);
  };

  const tabs = [
    { id: 'content', label: 'Content', icon: null },
    { id: 'style', label: 'Style', icon: Settings },
  ];

  const sections = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'summary', label: 'Summary' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
  ];

  const renderEditor = () => {
    if (activeTab === 'style') {
      return <StyleCustomizer />;
    }

    switch (activeSection) {
      case 'personal':
        return <PersonalInfoEditor />;
      case 'experience':
        return <ExperienceEditor />;
      case 'education':
        return <EducationEditor />;
      case 'skills':
        return <SkillsEditor />;
      default:
        return <div className="p-8 text-gray-500">Section editor coming soon...</div>;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <FileUp className="w-4 h-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" size="sm">
              <Sparkles className="w-4 h-4 mr-2" />
              AI Enhance
            </Button>
            <Button onClick={handleExportPDF} size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Editor */}
        <div className="w-1/2 flex flex-col bg-white border-r border-gray-200">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'content' | 'style')}
                  className={`flex-1 px-6 py-3 text-sm font-medium transition ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-700 border-b-2 border-primary-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {tab.icon && <tab.icon className="w-4 h-4 inline mr-2" />}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Section Navigation (for content tab) */}
          {activeTab === 'content' && (
            <div className="border-b border-gray-200 p-4">
              <div className="flex flex-wrap gap-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                      activeSection === section.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Editor Content */}
          <div className="flex-1 overflow-auto p-6">
            {renderEditor()}
          </div>
        </div>

        {/* Right Side - Preview */}
        <div className="w-1/2 overflow-auto bg-gray-100 p-6">
          <ResumePreview resume={resume} />
        </div>
      </div>
    </div>
  );
};
