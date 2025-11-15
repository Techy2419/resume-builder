import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Textarea';
import { analyzeResumeATS } from '../../lib/gemini';
import { useResumeStore } from '../../store/resumeStore';
import { Sparkles, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';
import type { ATSScore } from '../../types/resume';

export const ATSScanner: React.FC = () => {
  const { resume } = useResumeStore();
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [atsScore, setAtsScore] = useState<ATSScore | null>(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!resume) return;

    setLoading(true);
    setError('');
    setAtsScore(null);

    try {
      // Convert resume to text for analysis
      const resumeText = JSON.stringify(resume.data);

      const result = await analyzeResumeATS(
        resumeText,
        jobDescription || undefined
      );

      setAtsScore(result);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze resume. Make sure you have set up your Gemini API key.');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">ATS Compatibility Checker</h2>
        <p className="text-gray-600 mb-6">
          Analyze your resume for Applicant Tracking System compatibility and get suggestions for improvement.
        </p>

        <div className="space-y-4">
          <Textarea
            label="Job Description (Optional)"
            placeholder="Paste the job description here to get keyword match analysis..."
            rows={8}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />

          <Button
            onClick={handleAnalyze}
            disabled={loading || !resume}
            className="w-full"
          >
            {loading ? (
              <>Analyzing...</>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Analyze Resume
              </>
            )}
          </Button>

          {error && (
            <div className="flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>{error}</div>
            </div>
          )}
        </div>
      </div>

      {atsScore && (
        <div className="space-y-6">
          {/* Overall Score */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Overall ATS Score</h3>
            <div className="flex items-center justify-center">
              <div className={`text-6xl font-bold ${getScoreColor(atsScore.overall)}`}>
                {atsScore.overall}
                <span className="text-2xl">/100</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className={`p-4 rounded-lg ${getScoreBgColor(atsScore.formatScore)}`}>
                <div className="text-sm text-gray-700 mb-1">Format Score</div>
                <div className={`text-3xl font-bold ${getScoreColor(atsScore.formatScore)}`}>
                  {atsScore.formatScore}
                </div>
              </div>
              {jobDescription && (
                <div className={`p-4 rounded-lg ${getScoreBgColor(atsScore.keywordScore)}`}>
                  <div className="text-sm text-gray-700 mb-1">Keyword Match</div>
                  <div className={`text-3xl font-bold ${getScoreColor(atsScore.keywordScore)}`}>
                    {atsScore.keywordScore}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Matched Keywords */}
          {jobDescription && atsScore.matchedKeywords.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Matched Keywords ({atsScore.matchedKeywords.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {atsScore.matchedKeywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Missing Keywords */}
          {jobDescription && atsScore.missingKeywords.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                Missing Keywords ({atsScore.missingKeywords.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {atsScore.missingKeywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions */}
          {atsScore.suggestions.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Suggestions for Improvement</h3>
              <ul className="space-y-2">
                {atsScore.suggestions.map((suggestion, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <span className="text-primary-600 font-bold">•</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Section Scores */}
          {atsScore.sections.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Section Analysis</h3>
              <div className="space-y-4">
                {atsScore.sections.map((section, idx) => (
                  <div key={idx} className="border-l-4 pl-4" style={{
                    borderColor: section.score >= 80 ? '#10b981' : section.score >= 60 ? '#f59e0b' : '#ef4444'
                  }}>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-gray-900">{section.name}</h4>
                      <span className={`font-bold ${getScoreColor(section.score)}`}>
                        {section.score}/100
                      </span>
                    </div>
                    {section.issues.length > 0 && (
                      <ul className="space-y-1 text-sm text-gray-600">
                        {section.issues.map((issue, issueIdx) => (
                          <li key={issueIdx}>• {issue}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
