import { sequelize } from '@/connection/db.connection';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';



export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value || request.headers.get("authorization");
     await sequelize.authenticate()
  if (request.nextUrl.pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
