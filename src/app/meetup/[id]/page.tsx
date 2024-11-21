'use client'

import HomeButton from '@/components/HomeButton'
import { Button } from '@/components/ui/button'
import { MapPin } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import LabeledContent from '@/components/LabeledContent'
import { ErrorAlert } from '@/components/status/ErrorAlert'
import { LoadingSkeleton } from '@/components/status/LoadingSkeleton'
import ContentList from '@/components/ContentList'
import { useMeetupQueries } from '@/hooks/useMeetupList'
import { IMeetupDetailSectionProps, MeetupDetailType } from '@/types/IMeetup'
import { DEFAULT_IMAGE } from '@/types/INews'
import { useToast } from '@/hooks/use-toast'
import LoadingSpinner from '@/components/LoadingSpinner'

const MeetupDetailSection = ({
  meetupDetail,
  isLoading,
  isError,
  error,
  handleMeetupChange,
  isNavigatingPrev,
  isNavigatingNext,
}: IMeetupDetailSectionProps) => {
  if (isLoading) {
    return (
      <section className="flex flex-[8] flex-col gap-10 md:col-span-6">
        <LoadingSkeleton />
      </section>
    )
  }

  if (isError || !meetupDetail) {
    return (
      <section className="flex flex-[8] flex-col gap-10 md:col-span-6">
        <ErrorAlert
          error={error?.message || '데이터를 불러오는데 실패했습니다'}
        />
      </section>
    )
  }
  return (
    <section className="flex flex-[8] flex-col gap-10 pb-10 md:col-span-6">
      {/* 이벤트 상단 제목 */}
      <div className="flex w-full flex-col gap-10">
        <HomeButton />
        <header className="flex flex-col gap-2">
          <div className="flex w-full gap-2">
            <span className="text-sm font-bold text-orange">
              {meetupDetail?.region}
            </span>
            <span className="text-sm font-bold text-textLight">일회성</span>
            <span className="text-sm font-bold text-textLight">
              봉사시간 부여
            </span>
          </div>
          <h1 className="text-3xl font-bold">{meetupDetail?.title}</h1>
          <div className="flex justify-between">
            <div className="flex items-center">
              <MapPin className="h-4 w-4" />
              <p className="text-sm font-bold text-text">양재도서관</p>
            </div>
            <div>
              <p className="text-sm text-textLight">
                조회수 {meetupDetail?.hits}
              </p>
            </div>
          </div>
        </header>
      </div>
      <div>
        <Image
          src={meetupDetail?.imageUrl ?? DEFAULT_IMAGE}
          alt="Plogging meetupDetail main image"
          width={100}
          height={100}
          className="h-auto w-full rounded-lg"
        />
      </div>
      {/* 이벤트 상세 정보 */}
      <div className="rounded-lg bg-background p-6">
        {/* 상세 내용 제외 */}
        <div className="mb-4 grid grid-cols-1 gap-4 rounded-lg text-sm laptop:grid-cols-2">
          <LabeledContent
            label="참여기간"
            content={`${meetupDetail.startDate} - ${meetupDetail.endDate}`}
          />

          <LabeledContent
            label="참여장소"
            content={meetupDetail?.location ?? '-'}
          />

          <LabeledContent label="봉사점수" content="0.5시간" />
          <LabeledContent
            label="참여방법"
            content="양재천 ~ 양재천 일대를 걸으며 쓰레기(플로깅)"
          />
        </div>
        <div className="prose max-w-none space-y-4 text-sm">
          <span className="border-green- whitespace-nowrap rounded-md border bg-green p-1 text-xs font-semibold text-white">
            상세내용
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Button
          className="min-w-[120px] bg-solid"
          onClick={() => {
            handleMeetupChange('prev')
          }}
        >
          {isNavigatingPrev ? (
            <LoadingSpinner color="grey" />
          ) : (
            '이전 모임 보기'
          )}
        </Button>
        <Button
          className="min-w-[120px] bg-solid"
          onClick={() => {
            handleMeetupChange('next')
          }}
        >
          {isNavigatingNext ? (
            <LoadingSpinner color="grey" />
          ) : (
            '다음 모임 보기'
          )}
        </Button>
      </div>
    </section>
  )
}

export default function MeetupDetailPage() {
  const [currentPage, setCurrentPage] = useState(0) // 초기 페이지 1번으로 설정

  const pageSize = 6 // 페이지 당 아이템 수
  const path = usePathname()
  const meetupId = path.split('/').pop()
  const { toast } = useToast()

  const handlePageChange = async (newPage: number) => {
    setCurrentPage(newPage)
  }

  const {
    // 이벤트 디테일
    meetupDetail,
    meetupDetailiIsLoading,
    meetupDetailError,
    //이벤트 페이지네이션
    meetupList,
    meetupListIsError,
    meetupListIsLoading,

    // 이전 이벤트, 다음 이벤트
    navigate,
    isNavigatingNext,
    isNavigatingPrev,
  } = useMeetupQueries({
    currentPage,
    pageSize,
    meetupId,
  })

  const onChangeMeetupDetail = (type: MeetupDetailType) => {
    if (!meetupDetail?.id) return

    navigate(
      { type, currentId: meetupDetail.id },
      {
        onError: (error: Error) => {
          toast({
            title: '이동 실패',
            description: `${error.message}`,
            variant: 'destructive',
            duration: 1500,
          })
        },
      },
    )
  }

  return (
    <article className="m-auto mt-16 flex max-h-[1355px] w-full max-w-7xl gap-6 bg-white p-5">
      {/* // 이벤트 이미지 밎 상세 정보 */}
      <div className="flex w-full gap-6">
        {/* 왼쪽 뉴스 디테일 */}
        <div className="min-w-0 laptop:flex-[8]">
          <MeetupDetailSection
            meetupDetail={meetupDetail}
            isLoading={meetupDetailiIsLoading}
            isError={meetupDetailiIsLoading}
            error={meetupDetailError}
            handleMeetupChange={onChangeMeetupDetail}
            isNavigatingPrev={isNavigatingPrev}
            isNavigatingNext={isNavigatingNext}
          />
        </div>

        {/* 중앙 Divider */}
        <div className="hidden h-auto w-[1px] bg-gray-200 laptop:block" />

        {/* 오른쪽 사이드바 */}
        <div className="hidden min-w-0 laptop:block laptop:flex-[4]">
          <ContentList
            contentData={meetupList?.ploggingMeetupSimpleResponseList ?? []}
            totalPage={meetupList?.totalPage ?? 0}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            cotentListIsLoading={meetupListIsLoading}
            contentListIsError={meetupListIsError}
            eventType={'meetup'}
            styleType={'side'}
          />
        </div>
      </div>
    </article>
  )
}
