import { EventCard } from './ui/\bEventCard'
import { useState } from 'react'
import { ContentsPagination } from './ContentsPagination'
import { EventContentCard } from '@/types/IEvent'
import { useEventsQueries } from '@/hooks/useEventsQueries'

export default function EventListGrid() {
  const [currentPage, setCurrentPage] = useState(0) // 초기 페이지 1번으로 설정
  const pageSize = 15 // 페이지 당 아이템 수

  const { eventsList, eventsListIsLoading, evnetListError, eventListIsError } =
    useEventsQueries({ currentPage, pageSize })

  const handlePageChange = async (newPage: number) => {
    setCurrentPage(newPage)
  }

  if (eventsListIsLoading) return <div>Loading...</div>
  if (evnetListError || !eventsList)
    return <div>Error: {evnetListError?.message}</div>
  if (eventListIsError) return <div>Error: {eventListIsError}</div>
  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {eventsList?.content?.map((eventData: EventContentCard) => (
          <EventCard eventData={eventData} key={eventData.id} />
        ))}
      </div>
      <div className="mt-6">
        <ContentsPagination
          currentPage={currentPage}
          totalPage={eventsList?.totalPages ?? 0}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  )
}
