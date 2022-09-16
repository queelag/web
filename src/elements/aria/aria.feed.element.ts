import {
  AriaFeedArticleController,
  AriaFeedArticleDescriptionController,
  AriaFeedArticleLabelController,
  AriaFeedController
} from '@/controllers/aria.feed.controller'
import { Closest } from '@/decorators/closest'
import { CustomElement } from '@/decorators/custom.element'
import { Property } from '@/decorators/property'
import { Query } from '@/decorators/query'
import { QueryAll } from '@/decorators/query.all'
import { ElementName, KeyboardEventKey } from '@/definitions/enums'
import { ElementLogger } from '@/loggers/element.logger'
import { FocusableElement, tabbable } from 'tabbable'
import { BaseElement } from '../core/base.element'

declare global {
  interface HTMLElementTagNameMap {
    'q-aria-feed': AriaFeedElement
    'q-aria-feed-article': AriaFeedArticleElement
    'q-aria-feed-article-description': AriaFeedArticleDescriptionElement
    'q-aria-feed-article-label': AriaFeedArticleLabelElement
  }
}

@CustomElement('q-aria-feed')
export class AriaFeedElement extends BaseElement {
  protected aria: AriaFeedController = new AriaFeedController(this)

  @QueryAll('q-aria-feed-article')
  articleElements!: AriaFeedArticleElement[]

  @Property({ type: Boolean, reflect: true })
  busy?: boolean

  @Query('q-aria-feed-article[focused]')
  focusedArticleElement?: AriaFeedArticleElement

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('keydown', this.onKeyDown)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('keydown', this.onKeyDown)
  }

  onKeyDown = (event: KeyboardEvent): void => {
    switch (event.key) {
      case KeyboardEventKey.END:
      case KeyboardEventKey.HOME:
      case KeyboardEventKey.PAGE_DOWN:
      case KeyboardEventKey.PAGE_UP:
        event.preventDefault()
        event.stopPropagation()
    }

    switch (event.key) {
      case KeyboardEventKey.END:
        this.previousTabbableElementSibling?.focus()
        ElementLogger.verbose(this.uid, 'onKeyDown', 'END', `The previous tabbable element sibling has been focused.`)

        break
      case KeyboardEventKey.HOME:
        this.nextTabbableElementSibling?.focus()
        ElementLogger.verbose(this.uid, 'onKeyDown', 'HOME', `The next tabbable element sibling has been focused.`)

        break
      case KeyboardEventKey.PAGE_DOWN:
        if (this.focusedArticleElementIndex >= this.articleElements.length - 1) {
          return
        }

        this.articleElements[this.focusedArticleElementIndex + 1].focus()
        ElementLogger.verbose(this.uid, 'onKeyDown', 'PAGE_DOWN', `The next article has been focused.`)

        break
      case KeyboardEventKey.PAGE_UP:
        if (this.focusedArticleElementIndex <= 0) {
          return
        }

        this.articleElements[this.focusedArticleElementIndex - 1].focus()
        ElementLogger.verbose(this.uid, 'onKeyDown', 'PAGE_UP', `The previous article has been focused.`)

        break
    }
  }

  get focusedArticleElementIndex(): number {
    return this.focusedArticleElement ? this.articleElements.indexOf(this.focusedArticleElement) : -1
  }

  get name(): ElementName {
    return ElementName.FEED
  }

  get nextTabbableElementSibling(): FocusableElement | null {
    let focusable: FocusableElement[], next: FocusableElement | undefined

    focusable = tabbable(document.body, { getShadowRoot: true, includeContainer: true })
    next = focusable[focusable.indexOf(this.articleElements[this.articleElements.length - 1]) + 1]

    return next || null
  }

  get previousTabbableElementSibling(): FocusableElement | null {
    let focusable: FocusableElement[], previous: FocusableElement | undefined

    focusable = tabbable(document.body, { getShadowRoot: true, includeContainer: true })
    previous = focusable[focusable.indexOf(this.articleElements[0]) - 1]

    return previous || null
  }
}

@CustomElement('q-aria-feed-article')
export class AriaFeedArticleElement extends BaseElement {
  protected aria: AriaFeedArticleController = new AriaFeedArticleController(this)

  @Query('q-aria-feed-article-description')
  descriptionElement?: AriaFeedArticleDescriptionElement

  @Query('q-aria-feed-article-label')
  labelElement?: AriaFeedArticleLabelElement

  @Property({ type: Boolean, reflect: true })
  focused?: boolean

  @Closest('q-aria-feed')
  rootElement!: AriaFeedElement

  connectedCallback(): void {
    super.connectedCallback()

    this.addEventListener('blur', this.onBlur)
    this.addEventListener('focus', this.onFocus)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()

    this.removeEventListener('blur', this.onBlur)
    this.removeEventListener('focus', this.onFocus)
  }

  onBlur = (): void => {
    this.focused = false
    ElementLogger.verbose(this.uid, 'onFocus', `The article has been blurred.`)
  }

  onFocus = (): void => {
    this.focused = true
    ElementLogger.verbose(this.uid, 'onFocus', `The article has been focused.`)
  }

  get index(): number {
    return this.rootElement.articleElements.indexOf(this)
  }

  get name(): ElementName {
    return ElementName.FEED_ARTICLE
  }
}

@CustomElement('q-aria-feed-article-label')
export class AriaFeedArticleLabelElement extends BaseElement {
  protected aria: AriaFeedArticleLabelController = new AriaFeedArticleLabelController(this)

  get name(): ElementName {
    return ElementName.FEED_ARTICLE_LABEL
  }
}

@CustomElement('q-aria-feed-article-description')
export class AriaFeedArticleDescriptionElement extends BaseElement {
  protected aria: AriaFeedArticleDescriptionController = new AriaFeedArticleDescriptionController(this)

  get name(): ElementName {
    return ElementName.FEED_ARTICLE_DESCRIPTION
  }
}
