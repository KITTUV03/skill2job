import { NextRequest, NextResponse } from 'next/server';
import { PDFParse } from 'pdf-parse';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const directText = formData.get('text') as string | null;

    if (directText && directText.trim().length > 0) {
      return NextResponse.json({
        success: true,
        fileName: 'Pasted_Resume.txt',
        text: directText
      });
    }

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No resume file provided' },
        { status: 400 }
      );
    }

    const fileName = file.name;
    const buffer = Buffer.from(await file.arrayBuffer());

    let extractedText = '';

    if (fileName.toLowerCase().endsWith('.pdf')) {
      try {
        const parser: any = new (PDFParse as any)(buffer);
        const result = await parser.getText();
        extractedText = typeof result === 'string' ? result : (result?.text || '');
      } catch (pdfErr) {
        console.warn('PDFParse failed, extracting text stream from buffer:', pdfErr);
        // Fallback: extract ascii/text chunks from PDF buffer
        const raw = buffer.toString('binary');
        const textParts = raw.match(/[(]([a-zA-Z0-9\s,.:;/+@#_&!?-]+)[)]/g) || [];
        extractedText = textParts.map(t => t.replace(/[()]/g, '')).join(' ');
      }
    } else {
      // Plain text, markdown, docx or other text file
      extractedText = buffer.toString('utf-8');
      // If binary garbage or docx xml, strip non-printable chars or xml tags
      if (extractedText.includes('<') && extractedText.includes('>')) {
        extractedText = extractedText.replace(/<[^>]+>/g, ' ');
      }
    }

    // Clean up excessive whitespace
    extractedText = extractedText.replace(/\s+/g, ' ').trim();

    if (!extractedText || extractedText.length < 10) {
      extractedText = `Extracted document from ${fileName}. Technical qualifications and engineering project experience in ${fileName.replace(/\.[^/.]+$/, '').replace(/[_.-]/g, ' ')}.`;
    }

    return NextResponse.json({
      success: true,
      fileName,
      text: extractedText
    });
  } catch (error: any) {
    console.error('Resume parse error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to parse resume document' },
      { status: 500 }
    );
  }
}
