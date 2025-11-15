import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { FileText, Upload, Sparkles, CheckCircle } from 'lucide-react';
import { useResumeStore } from '../store/resumeStore';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { resetResume } = useResumeStore();

  const handleStartFromScratch = () => {
    resetResume();
    navigate('/editor');
  };

  const handleImport = () => {
    navigate('/editor?import=true');
  };

  const features = [
    'Multiple ATS-friendly templates',
    'AI-powered content suggestions with Gemini',
    'Customizable fonts, colors, and spacing',
    'Import existing resumes (PDF/DOCX)',
    'Real-time preview',
    'ATS compatibility checker',
    'Job description matcher',
    'Export to PDF and DOCX',
    'Auto-save to browser',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-8 h-8 text-primary-600" />
            <h1 className="text-2xl font-bold text-gray-900">ATS Resume Builder</h1>
          </div>
          <Button variant="outline" onClick={() => navigate('/editor')}>
            Open Editor
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Build Your Perfect Resume
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create ATS-friendly resumes with AI-powered suggestions. Free, customizable, and built for success.
          </p>

          <div className="flex gap-4 justify-center mb-12">
            <Button size="lg" onClick={handleStartFromScratch}>
              <FileText className="w-5 h-5 mr-2" />
              Start from Scratch
            </Button>
            <Button variant="outline" size="lg" onClick={handleImport}>
              <Upload className="w-5 h-5 mr-2" />
              Import Resume
            </Button>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Powered by Google Gemini AI
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              ATS-Friendly Templates
            </h3>
            <p className="text-gray-600 text-sm">
              Choose from multiple professional templates optimized to pass Applicant Tracking Systems.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              AI-Powered Suggestions
            </h3>
            <p className="text-gray-600 text-sm">
              Get intelligent content recommendations and improvements using Google Gemini AI.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              ATS Score Analysis
            </h3>
            <p className="text-gray-600 text-sm">
              Check your resume's compatibility score and get actionable suggestions for improvement.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Upload className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Import & Export
            </h3>
            <p className="text-gray-600 text-sm">
              Import existing resumes and export to PDF or DOCX format with one click.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Full Customization
            </h3>
            <p className="text-gray-600 text-sm">
              Control every aspect: fonts, colors, spacing, sections, and more.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              100% Free
            </h3>
            <p className="text-gray-600 text-sm">
              No subscriptions, no hidden fees. Build unlimited resumes for free.
            </p>
          </div>
        </div>

        {/* Features List */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Everything You Need
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button size="lg" onClick={handleStartFromScratch}>
              Get Started Now
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-600 text-sm">
          <p>Built with React, TypeScript, Tailwind CSS, and Google Gemini AI</p>
          <p className="mt-2">Free & Open Source Resume Builder</p>
        </div>
      </footer>
    </div>
  );
};
