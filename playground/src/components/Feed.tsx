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
      'q-feed': FeedProps
      'q-feed-article': FeedArticleProps
      'q-feed-article-description': FeedArticleDescriptionProps
      'q-feed-article-label': FeedArticleLabelProps
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
  const { element, ref } = useQueelagElement('q-feed')
  const [props] = useState<FeedProps>({})
  const [articles] = useState<number[]>([1, 2, 3])

  return (
    <div>
      <q-feed {...props} ref={ref} className='flex flex-col rounded-sm border divide-y border-gray-400 divide-gray-400'>
        {articles.map((article: number) => (
          <q-feed-article className='flex flex-col p-2 gap-1 text-xs' key={article}>
            <q-feed-article-label>Article {article}</q-feed-article-label>
            <q-feed-article-description className='text-gray-400'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</q-feed-article-description>
          </q-feed-article>
        ))}
      </q-feed>
    </div>
  )
}
