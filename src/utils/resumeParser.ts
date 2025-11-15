import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import { parseResumeText } from '../lib/gemini';
import type { ResumeData } from '../types/resume';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const extractTextFromPDF = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item: any) => item.str)
      .join(' ');
    fullText += pageText + '\n';
  }

  return fullText.trim();
};

export const extractTextFromDOCX = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value.trim();
};

export const parseResumeFile = async (file: File): Promise<Partial<ResumeData>> => {
  let text = '';

  // Extract text based on file type
  if (file.type === 'application/pdf') {
    text = await extractTextFromPDF(file);
  } else if (
    file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file.type === 'application/msword'
  ) {
    text = await extractTextFromDOCX(file);
  } else {
    throw new Error('Unsupported file type. Please upload a PDF or DOCX file.');
  }

  if (!text) {
    throw new Error('Could not extract text from file. The file might be empty or corrupted.');
  }

  // Use AI to parse the resume text
  const parsedData = await parseResumeText(text);

  // Add IDs to each item
  if (parsedData.experience) {
    parsedData.experience = parsedData.experience.map((exp: any) => ({
      ...exp,
      id: crypto.randomUUID(),
    }));
  }

  if (parsedData.education) {
    parsedData.education = parsedData.education.map((edu: any) => ({
      ...edu,
      id: crypto.randomUUID(),
    }));
  }

  if (parsedData.projects) {
    parsedData.projects = parsedData.projects.map((proj: any) => ({
      ...proj,
      id: crypto.randomUUID(),
    }));
  }

  if (parsedData.certifications) {
    parsedData.certifications = parsedData.certifications.map((cert: any) => ({
      ...cert,
      id: crypto.randomUUID(),
    }));
  }

  return parsedData;
};
