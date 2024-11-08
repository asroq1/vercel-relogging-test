'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function OAuthSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const authCode = searchParams.get('code')
    if (authCode) {
      localStorage.setItem('authCode', authCode)
      // router.replace('/')
      // TODO : 백엔드 서버로 인증 코드를 전송하여 토큰을 발급받는 로직을 구현 필요
    }
  }, [searchParams, router])

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold">로그인 처리 중...</h2>
        <p className="mt-2 text-gray-600">잠시만 기다려주세요.</p>
      </div>
    </div>
  )
}
