import { GoogleGenerativeAI } from '@google/generative-ai';

let genAI: GoogleGenerativeAI | null = null;

// Auto-initialize with env variable if available
const envApiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (envApiKey) {
  genAI = new GoogleGenerativeAI(envApiKey);
}

export const initGemini = (apiKey: string) => {
  if (apiKey) {
    genAI = new GoogleGenerativeAI(apiKey);
    localStorage.setItem('gemini-api-key', apiKey);
  }
};

export const getGeminiModel = () => {
  // Try to initialize from localStorage if not already initialized
  if (!genAI) {
    const storedKey = localStorage.getItem('gemini-api-key');
    if (storedKey) {
      genAI = new GoogleGenerativeAI(storedKey);
    } else if (!envApiKey) {
      throw new Error('Gemini AI not initialized. Please add your API key in settings.');
    }
  }
  // Using gemini-1.5-flash-latest which is the current working model
  return genAI!.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
};

export const isGeminiInitialized = (): boolean => {
  return genAI !== null || !!envApiKey || !!localStorage.getItem('gemini-api-key');
};

export const analyzeResumeATS = async (resumeText: string, jobDescription?: string) => {
  const model = getGeminiModel();

  const prompt = jobDescription
    ? `Analyze this resume for ATS compatibility and match it against the job description.
       Provide:
       1. Overall ATS score (0-100)
       2. Format score (0-100) - check for ATS-friendly formatting
       3. Keyword match score (0-100) - how well keywords match the job description
       4. List of matched keywords from the job description
       5. List of missing important keywords from the job description
       6. Specific suggestions for improvement
       7. Issues found in each section

       Resume:
       ${resumeText}

       Job Description:
       ${jobDescription}

       Return the response in JSON format with this structure:
       {
         "overall": number,
         "formatScore": number,
         "keywordScore": number,
         "matchedKeywords": string[],
         "missingKeywords": string[],
         "suggestions": string[],
         "sections": [{"name": string, "score": number, "issues": string[]}]
       }`
    : `Analyze this resume for ATS compatibility.
       Provide:
       1. Overall ATS score (0-100)
       2. Format score (0-100)
       3. Specific suggestions for improvement
       4. Issues found in each section

       Resume:
       ${resumeText}

       Return the response in JSON format with this structure:
       {
         "overall": number,
         "formatScore": number,
         "keywordScore": 0,
         "matchedKeywords": [],
         "missingKeywords": [],
         "suggestions": string[],
         "sections": [{"name": string, "score": number, "issues": string[]}]
       }`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  // Extract JSON from markdown code blocks if present
  const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/);
  const jsonText = jsonMatch ? jsonMatch[1] : text;

  return JSON.parse(jsonText);
};

export const improveBulletPoint = async (bulletPoint: string, jobDescription?: string) => {
  const model = getGeminiModel();

  const prompt = jobDescription
    ? `Improve this resume bullet point to better match the job description. Make it more impactful, quantifiable, and ATS-friendly. Keep it concise (1-2 lines).

       Current bullet point: ${bulletPoint}

       Job description: ${jobDescription}

       Return only the improved bullet point, no explanation.`
    : `Improve this resume bullet point. Make it more impactful, quantifiable, and ATS-friendly. Keep it concise (1-2 lines).

       Current bullet point: ${bulletPoint}

       Return only the improved bullet point, no explanation.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text().trim();
};

export const generateBulletPoints = async (role: string, company: string, context?: string) => {
  const model = getGeminiModel();

  const prompt = `Generate 3-5 impactful, ATS-friendly bullet points for this role:

    Role: ${role}
    Company: ${company}
    ${context ? `Additional context: ${context}` : ''}

    Make them:
    - Action-oriented (start with strong verbs)
    - Quantifiable where possible
    - Achievement-focused
    - Concise (1-2 lines each)

    Return as a JSON array of strings.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/);
  const jsonText = jsonMatch ? jsonMatch[1] : text;

  return JSON.parse(jsonText);
};

export const extractKeywords = async (jobDescription: string) => {
  const model = getGeminiModel();

  const prompt = `Extract important keywords, skills, and requirements from this job description.
    Focus on:
    - Technical skills
    - Soft skills
    - Required qualifications
    - Important industry terms

    Job Description:
    ${jobDescription}

    Return as a JSON object with categorized keywords:
    {
      "technical": string[],
      "soft": string[],
      "qualifications": string[],
      "other": string[]
    }`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/);
  const jsonText = jsonMatch ? jsonMatch[1] : text;

  return JSON.parse(jsonText);
};

export const parseResumeText = async (resumeText: string) => {
  const model = getGeminiModel();

  const prompt = `Parse this resume text and extract all information into a structured format.

    Resume text:
    ${resumeText}

    Return as JSON with this structure:
    {
      "personal": {
        "fullName": string,
        "email": string,
        "phone": string,
        "location": string,
        "linkedin": string,
        "website": string,
        "github": string
      },
      "summary": string,
      "experience": [{
        "company": string,
        "position": string,
        "location": string,
        "startDate": string,
        "endDate": string,
        "current": boolean,
        "achievements": string[]
      }],
      "education": [{
        "school": string,
        "degree": string,
        "field": string,
        "location": string,
        "startDate": string,
        "endDate": string,
        "gpa": string,
        "achievements": string[]
      }],
      "skills": [{
        "category": string,
        "items": string[]
      }],
      "projects": [{
        "name": string,
        "description": string,
        "technologies": string[],
        "link": string,
        "highlights": string[]
      }],
      "certifications": [{
        "name": string,
        "issuer": string,
        "date": string,
        "link": string
      }]
    }`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/);
  const jsonText = jsonMatch ? jsonMatch[1] : text;

  return JSON.parse(jsonText);
};
