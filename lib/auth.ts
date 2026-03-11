import { cookies } from 'next/headers'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'
const AUTH_COOKIE_NAME = 'admin_auth'
const AUTH_TOKEN = 'admin_authenticated'

export async function verifyAdminPassword(password: string): Promise<boolean> {
  return password === ADMIN_PASSWORD
}

export async function setAdminAuth() {
  const cookieStore = await cookies()
  cookieStore.set(AUTH_COOKIE_NAME, AUTH_TOKEN, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export async function clearAdminAuth() {
  const cookieStore = await cookies()
  cookieStore.delete(AUTH_COOKIE_NAME)
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value
  return token === AUTH_TOKEN
}
