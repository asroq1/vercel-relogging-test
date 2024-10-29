export interface PloggingEventImage {
  id: number
  url: string
  caption: string
  orderIndex: number
}

// 개별 플로깅 이벤트 타입 정의
export interface EventContentCard {
  id: string
  title: string
  location: string
  region: string
  hits: number
  image: PloggingEventImage
  startDate: string
  endDate: string
}

// 컨텐츠 배열 타입 정의
export interface PloggingEventContentList {
  content: EventContentCard[]
}

// 플로깅 이벤트 상세 정보 타입 정의
export interface EventContentDetail {
  id: number
  title: string
  content: string
  startDate: string
  endDate: string
  location: string
  region: string
  hits: number
  organizerName: string
  managerName: string
  phoneNumber: string
  participationTarget: string
  volunteerScore: string
  imageList: PloggingEventImage[]
}
