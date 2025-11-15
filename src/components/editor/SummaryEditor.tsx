import React, { useState } from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { Sparkles } from 'lucide-react';
import { getGeminiModel } from '../../lib/gemini';

export const SummaryEditor: React.FC = () => {
  const { resume, updateData } = useResumeStore();
  const [improving, setImproving] = useState(false);

  if (!resume) return null;

  const { summary } = resume.data;

  const handleImprove = async () => {
    if (!summary) return;

    setImproving(true);
    try {
      const model = getGeminiModel();
      const prompt = `Improve this professional summary for a resume. Make it more impactful, concise, and ATS-friendly. Keep it to 2-3 sentences. Return only the improved summary, no explanation.

Current summary: ${summary}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const improved = response.text().trim();

      updateData({ summary: improved });
    } catch (error: any) {
      alert(error.message || 'Failed to improve summary. Please check your AI configuration.');
    } finally {
      setImproving(false);
    }
  };

  const handleGenerate = async () => {
    const { personal, experience } = resume.data;

    if (!personal.fullName) {
      alert('Please fill in your personal information first.');
      return;
    }

    setImproving(true);
    try {
      const model = getGeminiModel();

      const experienceContext = experience.length > 0
        ? `Latest role: ${experience[0].position} at ${experience[0].company}`
        : '';

      const prompt = `Generate a professional summary for a resume for ${personal.fullName}. ${experienceContext}

Make it:
- 2-3 sentences
- Highlight key strengths and expertise
- ATS-friendly
- Professional tone

Return only the summary, no explanation.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const generated = response.text().trim();

      updateData({ summary: generated });
    } catch (error: any) {
      alert(error.message || 'Failed to generate summary. Please check your AI configuration.');
    } finally {
      setImproving(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Professional Summary</h2>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
        <p className="text-sm text-blue-800">
          💡 A strong professional summary highlights your key achievements and value proposition in 2-3 sentences.
        </p>
      </div>

      <Textarea
        label="Summary"
        value={summary}
        onChange={(e) => updateData({ summary: e.target.value })}
        placeholder="Results-driven software engineer with 5+ years of experience building scalable web applications..."
        rows={6}
      />

      <div className="flex gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={handleImprove}
          disabled={!summary || improving}
        >
          <Sparkles className="w-4 h-4 mr-2" />
          {improving ? 'Improving...' : 'Improve with AI'}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleGenerate}
          disabled={improving}
        >
          Generate New
        </Button>
      </div>

      <div className="mt-4 text-xs text-gray-500">
        <p><strong>Tips:</strong></p>
        <ul className="list-disc list-inside mt-1 space-y-1">
          <li>Start with your professional title and years of experience</li>
          <li>Highlight 2-3 key achievements or skills</li>
          <li>Include relevant keywords from your target job</li>
          <li>Keep it concise - 50-100 words maximum</li>
        </ul>
      </div>
    </div>
  );
};
