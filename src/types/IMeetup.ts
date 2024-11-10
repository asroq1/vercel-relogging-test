export type MeetupDetailType = 'prev' | 'next'

// MeetupDetailSection의 props 타입 정의
export interface MeetupDetailSectionProps {
  meetupDetail: MeetupContentCard | null // null 포함하여 데이터가 없을 경우 대비
  isLoading: boolean
  isError: boolean
  error: Error | null
  handleMeetupChange: (type: MeetupDetailType) => void
}

export interface MeetupContentCard {
  id: number
  title: string
  location: string
  region: string
  content: string
  hits: number
  startDate: string
  endDate: string
  participantTarget?: string
  supportDetails?: string
  activityHours?: string
  contactPerson: string
  contactNumber: string
  registrationLink?: string
  imageUrl: string
}

// 컨텐츠 배열 타입 정의
export interface PloggingMeetupList {
  content: MeetupContentCard[]
}
