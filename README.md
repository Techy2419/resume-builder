# ATS-Friendly Resume Builder

A free, modern, and powerful resume builder with AI-powered suggestions using Google Gemini. Built with React, TypeScript, and Tailwind CSS.

## Features

✨ **AI-Powered Features (Google Gemini)**
- Resume content suggestions and improvements
- ATS compatibility analysis
- Job description matching and keyword extraction
- Intelligent bullet point generation
- Resume parsing from text/PDF

🎨 **Customization**
- Multiple ATS-friendly templates (Modern, Classic, Minimal, Professional)
- Font family, size, and line height control
- Custom colors for headings, text, and accents
- Adjustable margins and spacing
- Drag-and-drop section reordering

📄 **Resume Management**
- Real-time preview
- Import existing resumes (PDF/DOCX)
- Export to PDF and DOCX
- Auto-save to browser localStorage
- JSON export/import for backup

🎯 **ATS Optimization**
- ATS compatibility scoring (0-100)
- Keyword match analysis
- Format checking
- Section-by-section analysis
- Actionable suggestions

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- A Google Gemini API key (free from Google AI Studio)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd resume-builder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Getting a Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key
5. In the resume builder, you'll need to add it when using AI features

**Note:** The free tier of Gemini API includes:
- 60 requests per minute
- 1,500 requests per day
- More than enough for personal resume building!

## Usage

### Building a Resume

1. **Start from Home Page**: Choose to start from scratch or import an existing resume
2. **Edit Content**: Use the left panel to edit your personal info, experience, education, skills, etc.
3. **Customize Style**: Switch to the "Style" tab to customize fonts, colors, margins, and template
4. **Preview in Real-Time**: See changes instantly in the right preview panel
5. **Export**: Click "Download PDF" when ready

### Using AI Features

Set your Gemini API key in the settings, then:

#### AI Resume Analysis
1. Use the ATS Scanner feature
2. Optionally paste a job description
3. Click "Analyze Resume"
4. Review your ATS score and suggestions

#### AI Content Improvements
- Click the sparkle icon (✨) next to any bullet point
- AI will suggest improved, more impactful versions
- Review and accept or modify as needed

## Project Structure

```
src/
├── components/
│   ├── editor/          # Resume editing components
│   ├── preview/         # Resume preview
│   ├── templates/       # Resume templates
│   ├── ui/             # Reusable UI components
│   └── ats-scanner/    # ATS analysis components
├── pages/              # Page components (Home, Editor)
├── types/              # TypeScript type definitions
├── store/              # Zustand state management
├── lib/                # Gemini AI integration
└── utils/              # Utility functions (PDF export, etc.)
```

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Google Gemini AI** - AI-powered features
- **jsPDF & html2canvas** - PDF generation
- **React Router** - Navigation
- **Lucide React** - Icons

## Building for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Deploy!

### Deploy to Netlify

1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)

## Privacy & Data

- **All data is stored locally** in your browser (localStorage)
- **No data is sent to any server** except Google Gemini API for AI features
- **Gemini API calls** only send resume text for analysis
- **You own your data** - export to JSON anytime

## License

MIT License - feel free to use this for personal or commercial projects!

---

**Built with ❤️ for job seekers everywhere**

Get started now: `npm install && npm run dev`
