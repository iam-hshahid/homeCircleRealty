import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    let files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      const singleFile = formData.get('file') as File | null;
      if (singleFile) {
        files = [singleFile];
      }
    }

    if (!files || files.length === 0) {
      return NextResponse.json({ success: false, error: 'No files uploaded' }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uploadedUrls: string[] = [];

    for (const file of files) {
      if (!file || typeof file === 'string' || !file.name) continue;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const ext = path.extname(file.name) || '.jpg';
      const cleanName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 30);
      const filename = `hc-${Date.now()}-${Math.random().toString(36).substring(2, 6)}-${cleanName}${ext}`;
      const filePath = path.join(uploadDir, filename);

      fs.writeFileSync(filePath, buffer);
      uploadedUrls.push(`/uploads/${filename}`);
    }

    return NextResponse.json({
      success: true,
      urls: uploadedUrls,
      url: uploadedUrls[0] || ''
    });
  } catch (error: any) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to process file upload' },
      { status: 500 }
    );
  }
}
