import { IEventsQueries, IPloggingEventContentList } from '@/types/IEvent'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export async function fetchEventsArticle(page: number, size: number) {
  const params = new URLSearchParams()
  params.append('page', page.toString())
  params.append('size', size.toString())
  params.append('sort', 'desc')

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/ploggingEvents/list?${params.toString()}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

const fetchEventDetail = async (eventId: string) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/ploggingEvents/${eventId}`,
    {
      method: 'get',
    },
  ).then((res) => {
    return res.json()
  })
  return data
}

export const useEventsQueries = ({
  currentPage,
  pageSize,
  eventId,
}: IEventsQueries) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const eventsListQuery = useQuery<IPloggingEventContentList>({
    queryKey: ['eventsList', currentPage, pageSize],
    queryFn: () => fetchEventsArticle(currentPage ?? 0, pageSize ?? 15),
    staleTime: 5 * 60 * 1000, // 데이터가 "신선"하다고 간주되는 시간 (5분)
    gcTime: 30 * 60 * 1000, // 데이터가 캐시에 유지되는 시간 (30분)
  })

  const eventDetailQuery = useQuery({
    queryKey: ['eventDetail', eventId],
    queryFn: () => fetchEventDetail(eventId ?? ''),
    enabled: !!eventId,
    staleTime: 5 * 60 * 1000, // 데이터가 "신선"하다고 간주되는 시간 (5분)
    gcTime: 30 * 60 * 1000, // 데이터가 캐시에 유지되는 시간 (30분)
  })

  // 이전/다음 이벤트 네비게이션
  const navigationMutation = useMutation({
    mutationFn: async ({
      type,
      currentId,
    }: {
      type: 'prev' | 'next'
      currentId: string
    }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/ploggingEvents/${currentId}/${type}`,
      )

      if (!response.ok) throw new Error(`Failed to fetch ${type} event`)

      const nextEvent = await response.json()
      // 응답에서 받은 이벤트 데이터를 바로 캐시에 저장
      queryClient.setQueryData(['eventDetail', nextEvent.id], nextEvent)

      return nextEvent
    },
    onSuccess: (newEvent) => {
      // URL 업데이트
      router.push(`/events/${newEvent.id}`)
    },
  })

  return {
    // 이벤트 리스트
    eventsList: eventsListQuery.data,
    eventsListIsLoading: eventsListQuery.isLoading,
    evnetListError: eventsListQuery.error,
    eventListIsError: eventsListQuery.isError,
    // 이벤트 디테일
    eventDetail: eventDetailQuery.data,
    eventDetailIsLoading: eventDetailQuery.isLoading,
    eventDetailIsError: eventDetailQuery.isError,
    eventDetailError: eventDetailQuery.error,

    navigate: navigationMutation.mutate,
    isNavigating: navigationMutation.isPending,
  }
}
