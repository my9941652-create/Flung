import type { Category, Prompt } from '../types';

const slugify = (value: string) => value.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();

export const downloadPromptPdf = async (prompt: Prompt, category: Category) => {
  const { jsPDF } = await import('jspdf');
  const pdf = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 18;
  let y = 20;

  const ensureSpace = (height: number) => {
    if (y + height > pageHeight - 18) {
      pdf.addPage();
      y = 20;
    }
  };

  pdf.setFillColor(245, 240, 227);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');
  pdf.setTextColor(17, 17, 17);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(11);
  pdf.text('FLUNG', margin, y);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8);
  pdf.text('AI CREATOR LIBRARY', margin, y + 5);
  pdf.setDrawColor(17, 17, 17);
  pdf.line(margin, y + 10, pageWidth - margin, y + 10);
  y += 25;

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(9);
  pdf.setTextColor(155, 44, 44);
  pdf.text(`${category.number} / ${category.title}`, margin, y);
  y += 9;
  pdf.setTextColor(17, 17, 17);
  pdf.setFontSize(24);
  const titleLines = pdf.splitTextToSize(prompt.title, pageWidth - margin * 2);
  pdf.text(titleLines, margin, y);
  y += titleLines.length * 10 + 5;

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(11);
  const descriptionLines = pdf.splitTextToSize(prompt.description, pageWidth - margin * 2);
  pdf.text(descriptionLines, margin, y);
  y += descriptionLines.length * 6 + 10;

  pdf.setFillColor(229, 223, 207);
  pdf.rect(margin, y, pageWidth - margin * 2, 26, 'F');
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8);
  pdf.text('REFERENCE IMAGE', margin + 7, y + 10);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.text('Preview placeholder — replace with a final reference image when available.', margin + 7, y + 17);
  y += 38;

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.text('PROMPT SECTIONS', margin, y);
  y += 9;

  prompt.sections.forEach((section) => {
    const contentLines = pdf.splitTextToSize(section.content, pageWidth - margin * 2 - 26);
    const blockHeight = 10 + contentLines.length * 5.2;
    ensureSpace(blockHeight);
    pdf.setTextColor(155, 44, 44);
    pdf.setFontSize(8);
    pdf.text(section.number, margin, y);
    pdf.setTextColor(17, 17, 17);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.text(section.title, margin + 10, y);
    y += 5;
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.text(contentLines, margin + 10, y);
    y += contentLines.length * 5.2 + 6;
  });

  if (prompt.negativePrompt) {
    const lines = pdf.splitTextToSize(prompt.negativePrompt, pageWidth - margin * 2 - 26);
    ensureSpace(lines.length * 5.2 + 16);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.setTextColor(155, 44, 44);
    pdf.text('NEGATIVE PROMPT', margin, y);
    y += 5;
    pdf.setTextColor(17, 17, 17);
    pdf.setFont('helvetica', 'normal');
    pdf.text(lines, margin, y);
  }

  const pages = pdf.getNumberOfPages();
  for (let page = 1; page <= pages; page += 1) {
    pdf.setPage(page);
    pdf.setDrawColor(17, 17, 17);
    pdf.line(margin, pageHeight - 13, pageWidth - margin, pageHeight - 13);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.text('FLUNG — AI Creator Library · Built by Mahendra Yadav', margin, pageHeight - 7);
    pdf.text(`${page}/${pages}`, pageWidth - margin - 8, pageHeight - 7);
  }

  pdf.save(`FLUNG-${slugify(category.title)}-${slugify(prompt.title)}.pdf`);
};
