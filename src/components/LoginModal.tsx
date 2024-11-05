'use client'

import { useLoginModal } from '@/hooks/useLoginModal'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import GoogleIcon from '@/assets/icon_google.svg'
import KakaoIcon from '@/assets/icon_kakao.svg'

export default function LoginModal() {
  const { isOpen, closeModal } = useLoginModal()
  const onLoginGoogle = async () => {
    window.location.href =
      'http://test.re-logging.com/oauth2/authorization/kakao'
  }
  const onLoginkKakao = async () => {
    window.location.href =
      'http://test.re-logging.com/oauth2/authorization/kakao'
  }
  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="// Close 버튼 너비 // Close 버튼 높이 // 오른쪽 위치 조정 // 위쪽 위치 조정 // 마진 조정 // X 아이콘 너비 // X 아이콘 높이 gap-0 rounded-lg bg-white p-0 desktop:max-w-[560px] [&>button]:right-6 [&>button]:top-6 [&>button]:-m-2 [&>button]:h-14 [&>button]:w-14 [&>button_svg]:h-4 [&>button_svg]:w-4">
        <DialogHeader className="space-y-6 p-6">
          <div className="flex items-center justify-center">
            <DialogTitle className="text-2xl font-bold text-text">
              로그인
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="margin-auto flex w-full flex-col items-start space-y-4 p-6 pt-2 desktop:max-w-[400px]">
          <span className="text-xs">소셜로그인</span>
          <button
            onClick={onLoginGoogle}
            className="// 기본 그림자 // 호버 시 그림자 증가 // 클릭 시 그림자 감소 // 클릭 시 살짝 내려가는 효과 flex w-full items-center justify-center gap-2 rounded-md bg-background p-3 shadow-md hover:shadow-lg active:translate-y-0.5 active:shadow-sm desktop:max-h-[48px]"
          >
            <GoogleIcon />

            <span className="text-sm">구글 계정으로 가입</span>
          </button>
          <button
            onClick={onLoginkKakao}
            className="// 기본 그림자 // 호버 시 그림자 증가 // 클릭 시 그림자 감소 // 클릭 시 살짝 내려가는 효과 flex w-full items-center justify-center gap-2 rounded-md bg-background p-3 shadow-md hover:shadow-lg active:translate-y-0.5 active:shadow-sm desktop:max-h-[48px]"
          >
            <KakaoIcon />
            <span className="text-sm">카카오 계정으로 가입</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
