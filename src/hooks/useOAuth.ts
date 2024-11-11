import { OAuthRequest, OAuthResponse } from '@/types/IAuth'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const getAccessToken = async ({
  authCode,
  socialType,
  redirectUri,
}: OAuthRequest): Promise<OAuthResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // credentials: 'include', // 쿠키 포함
      body: JSON.stringify({ code: authCode, redirectUri, socialType }),
    },
  )

  if (!response.ok) {
    // 에러 응답 확인을 위한 로깅
    const errorData = await response.json()
    console.error('Auth Error:', errorData)
    throw new Error(errorData.message || 'Authentication failed')
  }

  return response.json()
}

export const useOAuth = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: getAccessToken,
    onSuccess: (data) => {
      // 액세스 토큰 저장
      localStorage.setItem('accessToken', data.accessToken)
      router.replace('/')
    },
    onError: (error) => {
      console.error('로그인 실패', error)
      router.replace('?auth=login')
    },
  })
}
