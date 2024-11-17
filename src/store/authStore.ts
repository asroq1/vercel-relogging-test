import { clearToken } from '@/app/actions/auth'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  nickname: string
}

interface AuthState {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

interface AuthStore extends AuthState {
  setAuth: (user: User) => void
  clearAuth: () => void
  initializeAuth: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // 초기 상태
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: true,

      initializeAuth: () => {
        const cookies = document.cookie.split(';')
        const hasToken = cookies.some((cookie) =>
          cookie.trim().startsWith('accessToken='),
        )

        set({
          isAuthenticated: hasToken,
          isLoading: false,
        })
      },

      setAuth: (user: User) => {
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        })
      },

      clearAuth: async () => {
        try {
          await clearToken()
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          })
        } catch (error) {
          console.error('로그아웃 실패:', error)
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
