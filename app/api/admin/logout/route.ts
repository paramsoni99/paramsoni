import { NextRequest, NextResponse } from 'next/server'
import { clearAdminAuth } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    await clearAdminAuth()

    return NextResponse.json(
      { success: true },
      { status: 200 }
    )
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
