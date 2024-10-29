import { EventContentCard } from '@/types/IEvent'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { MapPin, Clock } from 'lucide-react'
import { DEFAULT_IMAGE } from '@/types/INews'

export const EventCard = ({ eventData }: { eventData: EventContentCard }) => {
  const router = useRouter()

  const onClickEventDetail = (id: string) => {
    router.push(`/events/${id}`)
  }

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }

  return (
    <Card
      className="
    cursor-pointer
    hover:shadow-lg
   transition-shadow
    p-4
    duration-300 
    w-full
    overflow-hidden
    flex              
    flex-col 
    max-w-[378px]
    min-h-[200px]
    laptop:max-w-[378px]    
    laptop:min-h-[200px]  
    aspect-[378/175]
    "
      onClick={() => onClickEventDetail(eventData.id)}
    >
      {/* <CardContent className="p-6"> */}
      {/* 상단 정보 */}
      <div className="w-full h-full flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-orange text-xs">{eventData.region}</span>
        </div>
        <div className="flex md:flex-row items-center gap-4">
          {/* 제목 - 모바일에서는 전체 너비, 데스크톱에서는 60% */}
          <h3 className="w-full md:flex-[6] text-lg text-text font-bold line-clamp-2">
            {eventData.title}
          </h3>
          {/* 이미지 - 모바일에서는 전체 너비, 데스크톱에서는 40% */}

          <div className="w-full md:flex-[4] relative h-[100px] rounded-lg">
            <Image
              src={eventData.image.url ?? DEFAULT_IMAGE}
              alt={eventData.image.caption || eventData.title}
              fill
              sizes="w-100 h-100"
              className="object-cover rounded-lg"
            />
          </div>
        </div>
        <div>
          {/* 위치 정보 */}
          <div className="flex items-center gap-2 text-text justify-between">
            <div className="flex gap-2">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{eventData.location}</span>
            </div>
            <span className="text-gray-400 text-sm">
              조회수 {eventData.hits}
            </span>
          </div>

          {/* 날짜 정보 */}
          <div className="flex items-center gap-2 text-text">
            <Clock className="w-4 h-4" />
            <p className="text-sm">
              {formatDate(eventData.startDate)} ~{' '}
              {formatDate(eventData.endDate)}
            </p>
          </div>
        </div>
      </div>
      {/* </CardContent> */}
    </Card>
  )
}
