import { NextRequest, NextResponse } from 'next/server'
import { signToken, COOKIE_NAME } from '@/lib/auth'

const ADMIN_USER = process.env.ADMIN_USERNAME || 'merve'
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'changeme123'

export async function POST(req: NextRequest) {
  // Handle logout (form post with _action=logout)
  const contentType = req.headers.get('content-type') || ''
  if (contentType.includes('application/x-www-form-urlencoded')) {
    const body = await req.text()
    if (body.includes('_action=logout')) {
      const res = NextResponse.redirect(new URL('/admin/login', req.url))
      res.cookies.delete(COOKIE_NAME)
      return res
    }
  }

  // Handle JSON login
  try {
    const { username, password } = await req.json()
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      const token = signToken(username)
      const res = NextResponse.json({ ok: true })
      res.cookies.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 gün
        path: '/',
      })
      return res
    }
    return NextResponse.json({ error: 'Hatalı giriş' }, { status: 401 })
  } catch {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
