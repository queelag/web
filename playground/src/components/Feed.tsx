import { useState } from 'preact/hooks'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type {
  FeedArticleDescriptionElement,
  FeedArticleDescriptionElementAttributes,
  FeedArticleElement,
  FeedArticleElementAttributes,
  FeedArticleLabelElement,
  FeedArticleLabelElementAttributes,
  FeedElement,
  FeedElementAttributes
} from '../../../src'
import '../../../src/elements/feed.element'
import { useQueelagElement } from '../hooks/use.queelag.element'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'queelag-feed': FeedProps
      'queelag-feed-article': FeedArticleProps
      'queelag-feed-article-description': FeedArticleDescriptionProps
      'queelag-feed-article-label': FeedArticleLabelProps
    }
  }
}

interface FeedProps extends FeedElementAttributes, DetailedHTMLProps<HTMLAttributes<FeedElement>, FeedElement> {}
interface FeedArticleProps extends FeedArticleElementAttributes, DetailedHTMLProps<HTMLAttributes<FeedArticleElement>, FeedArticleElement> {}
interface FeedArticleDescriptionProps
  extends FeedArticleDescriptionElementAttributes,
    DetailedHTMLProps<HTMLAttributes<FeedArticleDescriptionElement>, FeedArticleDescriptionElement> {}
interface FeedArticleLabelProps
  extends FeedArticleLabelElementAttributes,
    DetailedHTMLProps<HTMLAttributes<FeedArticleLabelElement>, FeedArticleLabelElement> {}

export function Feed() {
  const { element, ref } = useQueelagElement('queelag-feed')
  const [props] = useState<FeedProps>({})
  const [articles] = useState<number[]>([1, 2, 3])

  return (
    <div>
      <queelag-feed {...props} ref={ref} className='flex flex-col rounded-sm border divide-y border-gray-400 divide-gray-400'>
        {articles.map((article: number) => (
          <queelag-feed-article className='flex flex-col p-2 gap-1 text-xs' key={article}>
            <queelag-feed-article-label>Article {article}</queelag-feed-article-label>
            <queelag-feed-article-description className='text-gray-400'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </queelag-feed-article-description>
          </queelag-feed-article>
        ))}
      </queelag-feed>
    </div>
  )
}
