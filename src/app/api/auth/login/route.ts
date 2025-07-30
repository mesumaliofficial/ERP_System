import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { username, password } = body

    const adminUsername = process.env.ADMIN_USERNAME
    const adminPassword = process.env.ADMIN_PASSWORD

    if (username === adminUsername && password === adminPassword) {
      const response = NextResponse.json({ success: true }, { status: 200 })

      response.cookies.set('session', 'true', {
        path: '/',
        httpOnly: true,
      })
      return response

    } else {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong', error }, { status: 500 })
  }
}
