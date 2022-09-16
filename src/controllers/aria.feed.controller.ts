import { ELEMENT_UID_GENERATE_OPTIONS } from '@/definitions/constants'
import { ElementName } from '@/definitions/enums'
import type { AriaFeedArticleElement, AriaFeedElement } from '@/elements/aria/aria.feed.element'
import { setImmutableElementAttribute } from '@/utils/element.utils'
import { ID } from '@queelag/core'
import { ReactiveController, ReactiveControllerHost } from 'lit'

export class AriaFeedController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & AriaFeedElement) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.setAttributes()
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  setAttributes(): void {
    setImmutableElementAttribute(this.host, 'aria-busy', this.host.busy ? 'true' : 'false')
    //   setImmutableElementAttribute(this.host, 'aria-labelledby', '')
    setImmutableElementAttribute(this.host, 'role', 'feed')
  }
}

export class AriaFeedArticleController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & AriaFeedArticleElement) {
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

export class AriaFeedArticleDescriptionController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & HTMLElement) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.setAttributes()
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  setAttributes(): void {
    if (this.host.id.length > 0) {
      return
    }

    setImmutableElementAttribute(this.host, 'id', ID.generate({ ...ELEMENT_UID_GENERATE_OPTIONS, prefix: ElementName.FEED_ARTICLE_DESCRIPTION }))
  }
}

export class AriaFeedArticleLabelController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & HTMLElement) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.setAttributes()
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  setAttributes(): void {
    if (this.host.id.length > 0) {
      return
    }

    setImmutableElementAttribute(this.host, 'id', ID.generate({ ...ELEMENT_UID_GENERATE_OPTIONS, prefix: ElementName.FEED_ARTICLE_LABEL }))
  }
}
