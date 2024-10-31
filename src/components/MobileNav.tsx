'use client'

import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import Link from 'next/link'

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger className="laptop:hidden">
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>메뉴</SheetTitle>
        </SheetHeader>
        <div className="mt-4 flex flex-col space-y-4">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            로그인
          </Link>
          {/* 추가 메뉴 아이템들 */}
          <Link
            href="/about"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            소개
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
