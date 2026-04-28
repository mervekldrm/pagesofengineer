import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production'
const COOKIE_NAME = 'poe_admin_token'

export function signToken(username: string): string {
  return jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): { username: string; role: string } | null {
  try {
    return jwt.verify(token, SECRET) as { username: string; role: string }
  } catch {
    return null
  }
}

export function isAuthenticated(): boolean {
  const cookieStore = cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return false
  return verifyToken(token) !== null
}

export { COOKIE_NAME }
