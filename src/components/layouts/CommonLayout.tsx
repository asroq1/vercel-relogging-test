import type { Metadata } from 'next'
import '@/styles/globals.css'
import Link from 'next/link'
import Image from 'next/image'
import { MobileNav } from '../MobileNav'

export const metadata: Metadata = {
  title: '리로깅',
  description:
    '리로깅은 플로거들에게 다양한 환경뉴스 및 지자체 플로깅 정보를 제공하고, 플로거들간 커뮤니티가 활성화될 수 있도록 돕습니다.',
}

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className="bg-white">
        <nav className="flex h-10 w-full items-center justify-between bg-white p-5 laptop:h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold">
              <Image
                src={'/logo-navi.png'}
                alt="상단 심볼 로고"
                width={40}
                height={40}
                style={{ width: 'auto', height: 'auto' }} // 자동 크기 조정
              ></Image>
            </Link>
          </div>
          {/* 데스크탑 로그인 버튼 */}
          <div className="hidden laptop:block">
            <Link
              href="/login"
              className="rounded-md text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              로그인
            </Link>
          </div>
          {/* 모바일 햄버거 메뉴 */}
          <div className="flex-shrink-0 laptop:hidden">
            <MobileNav />
          </div>
        </nav>
        {children}
        {/* <footer>푸터</footer> */}
      </body>
    </html>
  )
}
