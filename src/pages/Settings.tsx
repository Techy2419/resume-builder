import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ArrowLeft, Check } from 'lucide-react';
import { initGemini, isGeminiInitialized } from '../lib/gemini';

export const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Load existing API key from localStorage
    const storedKey = localStorage.getItem('gemini-api-key');
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  const handleSave = () => {
    if (!apiKey.trim()) {
      setError('Please enter a valid API key');
      return;
    }

    try {
      initGemini(apiKey);
      setSaved(true);
      setError('');

      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError('Failed to initialize AI. Please check your API key.');
    }
  };

  const isConfigured = isGeminiInitialized();
  const envKeyConfigured = import.meta.env.VITE_GEMINI_API_KEY;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Google Gemini AI Configuration</h2>
            <p className="text-gray-600 text-sm">
              Configure your Gemini API key to enable AI-powered features like resume analysis, content suggestions, and ATS scoring.
            </p>
          </div>

          {isConfigured && (
            <div className="flex items-start gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
              <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">AI is configured and ready!</p>
                {envKeyConfigured && (
                  <p className="text-xs mt-1">Using API key from environment variables (.env file)</p>
                )}
              </div>
            </div>
          )}

          {!envKeyConfigured && (
            <div className="space-y-4">
              <div>
                <Input
                  label="Gemini API Key"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  error={error}
                />
                <p className="text-xs text-gray-500 mt-2">
                  Your API key is stored locally in your browser and never sent to any server except Google's Gemini API.
                </p>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleSave} disabled={saved}>
                  {saved ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Saved!
                    </>
                  ) : (
                    'Save API Key'
                  )}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => window.open('https://makersuite.google.com/app/apikey', '_blank')}
                >
                  Get API Key
                </Button>
              </div>
            </div>
          )}

          <div className="border-t pt-6 mt-6">
            <h3 className="font-semibold text-gray-900 mb-3">How to get a free Gemini API key:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
              <li>Go to <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Google AI Studio</a></li>
              <li>Sign in with your Google account</li>
              <li>Click "Create API Key"</li>
              <li>Copy the API key and paste it above</li>
              <li>Click "Save API Key"</li>
            </ol>

            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Free Tier Limits:</strong> 60 requests per minute, 1,500 requests per day.
                More than enough for building resumes!
              </p>
            </div>
          </div>

          <div className="border-t pt-6 mt-6">
            <h3 className="font-semibold text-gray-900 mb-3">AI Features Available:</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Resume content suggestions and improvements</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>ATS compatibility scoring (0-100)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Job description matching and keyword analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Intelligent resume parsing from PDF/DOCX</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Bullet point generation and enhancement</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};
