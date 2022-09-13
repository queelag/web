import { ReactiveController, ReactiveControllerHost } from 'lit'
import type { FeedArticleElement } from '../../elements/feed.element'
import { setImmutableElementAttribute } from '../../utils/element.utils'

export class AriaFeedArticleController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & FeedArticleElement) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.setAttributes()
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  setAttributes(): void {
    setImmutableElementAttribute(this.host, 'aria-describedby', this.host.descriptionElement?.id)
    setImmutableElementAttribute(this.host, 'aria-labelledby', this.host.labelElement?.id)
    setImmutableElementAttribute(this.host, 'aria-posinset', String(this.host.index + 1))
    setImmutableElementAttribute(this.host, 'aria-setsize', String(this.host.rootElement.articleElements.length))
    setImmutableElementAttribute(this.host, 'role', 'article')
    setImmutableElementAttribute(this.host, 'tabindex', '0')
  }
}
