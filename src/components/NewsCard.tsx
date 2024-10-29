import { DEFAULT_IMAGE, NewsArticleCard } from '@/types/INews'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useNewsQueries } from '@/hooks/useNewsQueries'

const NewsCard = ({ article }: { article: NewsArticleCard }) => {
  const router = useRouter()
  const {
    // 이전 이벤트, 다음 이벤트
    navigate,
  } = useNewsQueries({})

  const onClickNewsDetail = (type: 'main' | 'side') => {
    if (type === 'side') {
      // mutation 실행
      navigate(
        {
          type: 'side',
          currentId: article.id,
        },
        {
          onSuccess: (article) => {
            router.push(`/news/${article.id}`)
          },
          onError: (error: Error) => {
            console.error('Navigation failed:', error)
            // 에러 처리
          },
        },
      )
    } else {
      router.push(`/news/${article.id}`)
    }
  }
  return (
    //카드 컨테이너
    <Card
      onClick={() => onClickNewsDetail('side')}
      key={article?.id}
      className="
        cursor-pointer 
        hover:shadow-lg 
        transition-shadow
        p-4
        duration-300
        w-full
        max-w-[378px]           
        min-h-[200px]         
        laptop:max-w-[378px]    /* 데스크탑 너비 */
        laptop:min-h-[200px]    /* 데스크탑 높이 */
        aspect-[378/175]
        overflow-hidden
        flex              
        flex-col 
        gap-4
        "
    >
      {/* 카드 헤더 */}
      <CardHeader className="p-0 h-[25%]  space-y-0">
        <p className="text-sm text-textLight">{article?.publishedAt}</p>
        <CardTitle className="mb-2 text-lg text-text font-bold line-clamp-1 flex-shrink-0">
          {article?.title}
        </CardTitle>
      </CardHeader>
      {/* 카드 컨텐츠 */}
      <CardContent className="flex gap-4 p-0 flex-1 min-h-0  h-[75%] flex-shrink-0">
        <div className="flex-[6] flex items-center">
          <p
            className="
            text-xs
            text-text
            text-muted-foreground
            line-clamp-3
            overflow-hidden
          "
          >
            {article?.aiSummary}
          </p>
        </div>
        <div className="flex-[4] relative">
          <Image
            src={article.imagePath ?? DEFAULT_IMAGE}
            alt={article?.title}
            fill
            sizes="w-100 h-100"
            className="rounded-lg"
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default NewsCard
