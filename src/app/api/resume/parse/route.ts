import { NextRequest, NextResponse } from 'next/server';
import { parseResumeText } from '@/lib/resumeParser';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fileName, text } = body;

    const parsedProfile = await parseResumeText(fileName || 'Uploaded_Resume.pdf', text || '');

    return NextResponse.json({
      success: true,
      profile: parsedProfile
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to parse resume content.' },
      { status: 500 }
    );
  }
}
