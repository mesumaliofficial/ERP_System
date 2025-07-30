import { NextResponse } from 'next/server'

export async function GET() {
  const response = new NextResponse(null, {status: 302, headers: {location: '/login'}});

  response.cookies.set('session', '', {
    path: '/',
    httpOnly: true,
    expires: new Date(0)
  })

  return response
}