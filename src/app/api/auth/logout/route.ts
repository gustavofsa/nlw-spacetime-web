import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const redirectURl = new URL('/', request.url)

  return NextResponse.redirect(redirectURl, {
    headers: {
      'Set-Cookie': `token=; Path=/; max-age=0;`,
    },
  })
}
