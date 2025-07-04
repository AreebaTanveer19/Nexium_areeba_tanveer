import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch('https://zenquotes.io/api/random');
  const data = await res.json();
  return NextResponse.json(data);
} 