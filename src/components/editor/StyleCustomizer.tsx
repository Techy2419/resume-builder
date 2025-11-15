import React from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { Input } from '../ui/Input';

export const StyleCustomizer: React.FC = () => {
  const { resume, updateStyle } = useResumeStore();

  if (!resume) return null;

  const { style } = resume;

  const templates = [
    { id: 'modern', name: 'Modern', description: 'Clean and contemporary' },
    { id: 'classic', name: 'Classic', description: 'Traditional format' },
    { id: 'minimal', name: 'Minimal', description: 'Simple and elegant' },
    { id: 'professional', name: 'Professional', description: 'Corporate style' },
  ];

  const fonts = [
    'Arial, sans-serif',
    'Helvetica, sans-serif',
    'Times New Roman, serif',
    'Georgia, serif',
    'Calibri, sans-serif',
    'Verdana, sans-serif',
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Style Customization</h2>
        <p className="text-sm text-gray-600 mb-6">
          Customize the appearance of your resume. All changes update in real-time.
        </p>
      </div>

      {/* Template Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Template
        </label>
        <div className="grid grid-cols-2 gap-3">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => updateStyle({ template: template.id as any })}
              className={`p-4 rounded-lg border-2 text-left transition ${
                style.template === template.id
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-semibold text-gray-900">{template.name}</div>
              <div className="text-sm text-gray-600">{template.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Font Family */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Font Family
        </label>
        <select
          value={style.fontFamily}
          onChange={(e) => updateStyle({ fontFamily: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {fonts.map((font) => (
            <option key={font} value={font}>
              {font.split(',')[0]}
            </option>
          ))}
        </select>
      </div>

      {/* Font Size & Line Height */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Font Size (pt)
          </label>
          <input
            type="number"
            min="8"
            max="14"
            step="0.5"
            value={style.fontSize}
            onChange={(e) => updateStyle({ fontSize: parseFloat(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Line Height
          </label>
          <input
            type="number"
            min="1"
            max="2"
            step="0.1"
            value={style.lineHeight}
            onChange={(e) => updateStyle({ lineHeight: parseFloat(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Colors */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Colors
        </label>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={style.colors.primary}
              onChange={(e) =>
                updateStyle({
                  colors: { ...style.colors, primary: e.target.value },
                })
              }
              className="h-10 w-20 rounded border border-gray-300"
            />
            <span className="text-sm text-gray-700">Primary Color (accents, links)</span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={style.colors.headings}
              onChange={(e) =>
                updateStyle({
                  colors: { ...style.colors, headings: e.target.value },
                })
              }
              className="h-10 w-20 rounded border border-gray-300"
            />
            <span className="text-sm text-gray-700">Headings Color</span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={style.colors.text}
              onChange={(e) =>
                updateStyle({
                  colors: { ...style.colors, text: e.target.value },
                })
              }
              className="h-10 w-20 rounded border border-gray-300"
            />
            <span className="text-sm text-gray-700">Body Text Color</span>
          </div>
        </div>
      </div>

      {/* Margins */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Page Margins (inches)
        </label>
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Top"
            type="number"
            min="0.25"
            max="2"
            step="0.25"
            value={style.margins.top}
            onChange={(e) =>
              updateStyle({
                margins: { ...style.margins, top: parseFloat(e.target.value) },
              })
            }
          />
          <Input
            label="Bottom"
            type="number"
            min="0.25"
            max="2"
            step="0.25"
            value={style.margins.bottom}
            onChange={(e) =>
              updateStyle({
                margins: { ...style.margins, bottom: parseFloat(e.target.value) },
              })
            }
          />
          <Input
            label="Left"
            type="number"
            min="0.25"
            max="2"
            step="0.25"
            value={style.margins.left}
            onChange={(e) =>
              updateStyle({
                margins: { ...style.margins, left: parseFloat(e.target.value) },
              })
            }
          />
          <Input
            label="Right"
            type="number"
            min="0.25"
            max="2"
            step="0.25"
            value={style.margins.right}
            onChange={(e) =>
              updateStyle({
                margins: { ...style.margins, right: parseFloat(e.target.value) },
              })
            }
          />
        </div>
      </div>

      {/* Spacing */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Spacing (pixels)
        </label>
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Section Gap"
            type="number"
            min="8"
            max="32"
            step="4"
            value={style.spacing.sectionGap}
            onChange={(e) =>
              updateStyle({
                spacing: { ...style.spacing, sectionGap: parseInt(e.target.value) },
              })
            }
          />
          <Input
            label="Item Gap"
            type="number"
            min="4"
            max="24"
            step="2"
            value={style.spacing.itemGap}
            onChange={(e) =>
              updateStyle({
                spacing: { ...style.spacing, itemGap: parseInt(e.target.value) },
              })
            }
          />
        </div>
      </div>
    </div>
  );
};
