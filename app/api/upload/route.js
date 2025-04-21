import { writeFile } from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const formData = await req.formData();
  const image = formData.get('image');

  if (!image || typeof image === 'string') {
    return NextResponse.json({ error: 'Invalid image data' }, { status: 400 });
  }

  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filename = `${nanoid()}.png`;
  const filePath = path.join(process.cwd(), 'public/uploads', filename);

  await writeFile(filePath, buffer);

  return NextResponse.json({ url: `/uploads/${filename}` });
}
