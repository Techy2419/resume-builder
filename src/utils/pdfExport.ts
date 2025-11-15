import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import type { Resume } from '../types/resume';

export const exportToPDF = async (resume: Resume) => {
  const element = document.getElementById('resume-preview');
  if (!element) {
    console.error('Resume preview element not found');
    return;
  }

  try {
    // Capture the resume as canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    // Calculate dimensions for Letter size (8.5" x 11")
    const imgWidth = 8.5;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const pdf = new jsPDF({
      orientation: imgHeight > 11 ? 'portrait' : 'portrait',
      unit: 'in',
      format: 'letter',
    });

    const imgData = canvas.toDataURL('image/png');

    // If content is longer than one page, we might need multiple pages
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= 11;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= 11;
    }

    // Generate filename from name
    const fileName = `${resume.data.personal.fullName.replace(/\s+/g, '_')}_Resume.pdf` || 'Resume.pdf';
    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. Please try again.');
  }
};
