import { OAuthRequest, OAuthResponse } from '@/types/IAuth'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const getAccessToken = async ({
  authCode,
  socialType,
  redirectUri,
}: OAuthRequest): Promise<OAuthResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login/google`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ authCode, redirectUri, socialType }),
    },
  )

  if (!response.ok) {
    throw new Error('인증 실패')
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
