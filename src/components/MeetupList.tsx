import { useState } from 'react'
import ContentList from './ContentList'
import { useMeetupQueries } from '@/hooks/useMeetupList'

export default function MeetupList() {
  const [currentPage, setCurrentPage] = useState(0) // 초기 페이지 1번으로 설정
  const pageSize = 15 // 페이지 당 아이템 수

  const { meetupList, meetupListIsLoading, meetupListIsError } =
    useMeetupQueries({ currentPage, pageSize })

  const handlePageChange = async (newPage: number) => {
    setCurrentPage(newPage)
  }

  return (
    <>
      <ContentList
        contentData={meetupList?.content}
        totalPage={meetupList?.totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        cotentListIsLoading={meetupListIsLoading}
        contentListIsError={meetupListIsError}
        eventType={'meetup'}
        styleType={'grid'}
      />
    </>
  )
}
