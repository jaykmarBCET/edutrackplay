export const runtime = 'nodejs'; // ✅ Add this at top of your file

import { NextRequest } from 'next/server';
import { sequelize } from '@/connection/db.connection';

export async function GET(req: NextRequest) {
  try {
    await sequelize.authenticate();
    return Response.json({ message: '✅ Connected to DB' });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}
