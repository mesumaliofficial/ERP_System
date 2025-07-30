// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Only allow public access to /
const publicRoutes = ['/']

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value
  const pathname = request.nextUrl.pathname

  const isPublic = publicRoutes.includes(pathname)

  if (!isPublic && !session) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|.*\\..*|api).*)']
}
