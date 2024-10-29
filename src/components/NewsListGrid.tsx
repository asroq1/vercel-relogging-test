import { NewsArticleCard } from '@/types/INews'
import { ContentsPagination } from './ContentsPagination'
import { useState } from 'react'
import NewsCard from './NewsCard'
import { useNewsQueries } from '@/hooks/useNewsQueries'

export default function NewsListGrid() {
  const [currentPage, setCurrentPage] = useState(0) // 초기 페이지 1번으로 설정
  const pageSize = 15 // 페이지 당 아이템 수

  const { newsList, newsListError, newsListIsError, newsListIsLoading } =
    useNewsQueries({ currentPage, pageSize })
  const handlePageChange = async (newPage: number) => {
    setCurrentPage(newPage)
  }

  // TODO article List 컴포넌트 분리하기
  // 로딩 상태
  if (newsListIsLoading) return <div>Loading...</div>
  // 에러 상태
  if (newsListError) return <div>Error: {newsListError.message}</div>

  if (newsListIsError) return <div>Error: {newsListIsError}</div>
  // 데이터가 없는 경우
  if (!newsList) return null
  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {newsList?.newsArticleSimpleResponseList?.map(
          (article: NewsArticleCard) => (
            <NewsCard article={article} key={article.id} />
          ),
        )}
      </div>
      <div className="mt-6">
        <ContentsPagination
          currentPage={currentPage}
          totalPage={newsList?.totalPage ?? 0}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  )
}
