'use server'
import { auth, signIn, signOut, update } from '@/auth'

export const signInWithGoogle = async () => {
  await signIn('google', {
    /* 옵션 */
  })
  // ...
}
export const signInWithKakao = async () => {
  await signIn('kakao', {
    /* 옵션 */
  })
  // ...
}
export const signOutWithForm = async (formData: FormData) => {
  await signOut()
}
export { auth as getSession, update as updateSession }
