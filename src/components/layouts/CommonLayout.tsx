import type { Metadata } from 'next'
import '@/styles/globals.css'
import Link from 'next/link'
import Image from 'next/image'

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
        <nav className="shadow-smshadow-sm bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/" className="text-xl font-bold">
                    <Image
                      src={'/symbol.jpg'}
                      alt="상단 심볼 로고"
                      width={70}
                      height={40}
                    ></Image>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8"></div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <Link
                  href="/login"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  로그인
                </Link>
              </div>
            </div>
          </div>
        </nav>
        {children}
        {/* <footer>푸터</footer> */}
      </body>
    </html>
  )
}
