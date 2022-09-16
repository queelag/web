import {
  AriaCarouselController,
  AriaCarouselNextSlideControlController,
  AriaCarouselPreviousSlideControlController,
  AriaCarouselRotationControlController,
  AriaCarouselSlideController,
  AriaCarouselSlidesController,
  AriaCarouselTabController,
  AriaCarouselTabsController
} from '@/controllers/aria.carousel.controller'
import { Closest } from '@/decorators/closest'
import { CustomElement } from '@/decorators/custom.element'
import { Internal } from '@/decorators/internal'
import { Property } from '@/decorators/property'
import { Query } from '@/decorators/query'
import { QueryAll } from '@/decorators/query.all'
import { State } from '@/decorators/state'
import { DEFAULT_CAROUSEL_ROTATION_DURATION } from '@/definitions/constants'
import { ElementName, KeyboardEventKey } from '@/definitions/enums'
import { AriaLive } from '@/definitions/types'
import { ElementLogger } from '@/loggers/element.logger'
import { Interval } from '@queelag/core'
import { css } from 'lit'
import { BaseElement } from '../core/base.element'
import { AriaButtonElement } from './aria.button.element'

declare global {
  interface HTMLElementTagNameMap {
    'q-aria-carousel': AriaCarouselElement
    'q-aria-carousel-next-slide-control': AriaCarouselNextSlideControlElement
    'q-aria-carousel-previous-slide-control': AriaCarouselPreviousSlideControlElement
    'q-aria-carousel-rotation-control': AriaCarouselRotationControlElement
    'q-aria-carousel-slide': AriaCarouselSlideElement
    'q-aria-carousel-slides': AriaCarouselSlidesElement
    'q-aria-carousel-tab': AriaCarouselTabElement
    'q-aria-carousel-tabs': AriaCarouselTabsElement
  }
}

@CustomElement('q-aria-carousel')
export class AriaCarouselElement extends BaseElement {
  protected aria: AriaCarouselController = new AriaCarouselController(this)

  @Query('q-aria-carousel-slide[active]')
  activeSlideElement?: AriaCarouselSlideElement

  @Query('q-aria-carousel-tab[active]')
  activeTabElement?: AriaCarouselSlideElement

  @Property({ type: Boolean, attribute: 'automatic-rotation', reflect: true })
  automaticRotation?: boolean

  @Property({ type: Number, attribute: 'automatic-rotation-interval-time', reflect: true })
  automaticRotationIntervalTime?: number

  @Internal()
  forceAutomaticRotation?: boolean

  @Property({ type: Boolean, attribute: 'infinite-rotation', reflect: true })
  infiniteRotation?: boolean

  @State()
  live?: AriaLive

  @QueryAll('q-aria-carousel-slide')
  slideElements!: AriaCarouselSlideElement[]

  @Query('q-aria-carousel-slides')
  slidesElement!: AriaCarouselSlidesElement

  @QueryAll('q-aria-carousel-tab')
  tabElements!: AriaCarouselTabElement[]

  @Query('q-aria-carousel-tabs')
  tabsElement?: AriaCarouselTabsElement

  connectedCallback(): void {
    super.connectedCallback()

    this.addEventListener('blur', this.onBlur)
    this.addEventListener('focus', this.onFocus)
    this.addEventListener('mouseenter', this.onMouseEnter)
    this.addEventListener('mouseleave', this.onMouseLeave)

    if (this.automaticRotation) {
      Interval.start(this.uid, this.activateNextSlide, this.automaticRotationIntervalTime ?? DEFAULT_CAROUSEL_ROTATION_DURATION)
      ElementLogger.verbose(this.uid, 'connectedCallback', `The automatic rotation has been started.`)

      return
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()

    this.removeEventListener('blur', this.onBlur)
    this.removeEventListener('focus', this.onFocus)
    this.removeEventListener('mouseenter', this.onMouseEnter)
    this.removeEventListener('mouseleave', this.onMouseLeave)

    Interval.stop(this.uid)
    ElementLogger.verbose(this.uid, 'disconnectedCallback', `The automatic rotation has been stopped.`)
  }

  onBlur = (): void => {
    this.onBlurOrMouseLeave()
  }

  onFocus = (): void => {
    this.onFocusOrMouseEnter()
  }

  onMouseEnter = (): void => {
    this.onFocusOrMouseEnter()
  }

  onMouseLeave = (): void => {
    this.onBlurOrMouseLeave()
  }

  onBlurOrMouseLeave = (): void => {
    if (this.forceAutomaticRotation || !this.automaticRotation) {
      return
    }

    Interval.stop(this.uid)

    Interval.start(this.uid, this.activateNextSlide, this.automaticRotationIntervalTime ?? DEFAULT_CAROUSEL_ROTATION_DURATION)
    ElementLogger.verbose(this.uid, 'onBlur', `The automatic rotation has been started.`)

    this.live = undefined
    ElementLogger.verbose(this.uid, 'onBlur', `The temporary live state has been unset.`)
  }

  onFocusOrMouseEnter = (): void => {
    if (this.forceAutomaticRotation || !this.automaticRotation) {
      return
    }

    this.live = 'polite'
    ElementLogger.verbose(this.uid, 'onFocus', `The temporary live state has been set to polite.`)

    Interval.stop(this.uid)
    ElementLogger.verbose(this.uid, 'onFocus', `The automatic rotation has been stopped.`)
  }

  activateNextSlide = (): void => {
    if (this.activeSlideElementIndex >= this.slideElements.length - 1) {
      if (!this.infiniteRotation) {
        return
      }

      this.activeSlideElement?.deactivate()
      this.activeTabElement?.deactivate()

      this.slideElements[0].activate()
      ElementLogger.verbose(this.uid, 'activateNextSlide', `The first slide has been activated.`)

      this.tabElements[0].activate()
      ElementLogger.verbose(this.uid, 'activateNextSlide', `The first tab has been activated.`)

      return
    }

    this.activeSlideElement?.deactivate()
    this.activeTabElement?.deactivate()

    this.slideElements[this.activeSlideElementIndex + 1].activate()
    ElementLogger.verbose(this.uid, 'activateNextSlide', `The next slide has been activated.`)

    this.tabElements[this.activeSlideElementIndex + 1].activate()
    ElementLogger.verbose(this.uid, 'activateNextSlide', `The next tab has been activated.`)
  }

  activatePreviousSlide = (): void => {
    if (this.activeSlideElementIndex <= 0) {
      if (!this.infiniteRotation) {
        return
      }

      this.activeSlideElement?.deactivate()

      this.slideElements[this.slideElements.length - 1].activate()
      ElementLogger.verbose(this.uid, 'activatePreviousSlide', `The last slide has been activated.`)

      return
    }

    this.activeSlideElement?.deactivate()

    this.slideElements[this.activeSlideElementIndex - 1].activate()
    ElementLogger.verbose(this.uid, 'activatePreviousSlide', `The previous slide has been activated.`)
  }

  get activeSlideElementIndex(): number {
    return this.activeSlideElement ? this.slideElements.indexOf(this.activeSlideElement) : -1
  }

  get name(): ElementName {
    return ElementName.CAROUSEL
  }
}

@CustomElement('q-aria-carousel-slides')
export class AriaCarouselSlidesElement extends BaseElement {
  protected aria: AriaCarouselSlidesController = new AriaCarouselSlidesController(this)

  @Closest('q-aria-carousel')
  rootElement!: AriaCarouselElement

  get name(): ElementName {
    return ElementName.CAROUSEL_SLIDES
  }
}

@CustomElement('q-aria-carousel-slide')
export class AriaCarouselSlideElement extends BaseElement {
  protected aria: AriaCarouselSlideController = new AriaCarouselSlideController(this)

  @Property({ type: Boolean, reflect: true })
  active?: boolean

  @Closest('q-aria-carousel')
  rootElement!: AriaCarouselElement

  @Closest('q-aria-carousel-slides')
  slidesElement!: AriaCarouselSlidesElement

  activate(): void {
    this.active = true
  }

  deactivate(): void {
    this.active = false
  }

  get index(): number {
    return this.rootElement.slideElements.indexOf(this)
  }

  get name(): ElementName {
    return ElementName.CAROUSEL_SLIDE
  }
}

@CustomElement('q-aria-carousel-rotation-control')
export class AriaCarouselRotationControlElement extends AriaButtonElement {
  protected aria2: AriaCarouselRotationControlController = new AriaCarouselRotationControlController(this)

  @Closest('q-aria-carousel')
  rootElement!: AriaCarouselElement

  onClick = (): void => {
    this.rootElement.forceAutomaticRotation = true
    this.rootElement.live = undefined

    if (this.rootElement.automaticRotation) {
      Interval.stop(this.rootElement.uid)
    }

    this.rootElement.automaticRotation = !this.rootElement.automaticRotation
    ElementLogger.verbose(this.uid, 'onClick', `The automatic rotation has been ${this.rootElement.automaticRotation ? 'enabled' : 'disabled'}.`)

    if (this.rootElement.automaticRotation) {
      Interval.start(
        this.rootElement.uid,
        this.rootElement.activateNextSlide,
        this.rootElement.automaticRotationIntervalTime ?? DEFAULT_CAROUSEL_ROTATION_DURATION
      )
      ElementLogger.verbose(this.uid, 'onClick', `The automatic rotation has been started.`)
    }
  }

  get name(): ElementName {
    return ElementName.CAROUSEL_ROTATION_CONTROL
  }
}

@CustomElement('q-aria-carousel-next-slide-control')
export class AriaCarouselNextSlideControlElement extends AriaButtonElement {
  protected aria2: AriaCarouselNextSlideControlController = new AriaCarouselNextSlideControlController(this)

  @Closest('q-aria-carousel')
  rootElement!: AriaCarouselElement

  onClick = (): void => {
    this.rootElement.activateNextSlide()
  }

  get name(): ElementName {
    return ElementName.CAROUSEL_NEXT_SLIDE_CONTROL
  }
}

@CustomElement('q-aria-carousel-previous-slide-control')
export class AriaCarouselPreviousSlideControlElement extends AriaButtonElement {
  protected aria2: AriaCarouselPreviousSlideControlController = new AriaCarouselPreviousSlideControlController(this)

  @Closest('q-aria-carousel')
  rootElement!: AriaCarouselElement

  onClick = (): void => {
    this.rootElement.activatePreviousSlide()
  }

  get name(): ElementName {
    return ElementName.CAROUSEL_PREVIOUS_SLIDE_CONTROL
  }
}

@CustomElement('q-aria-carousel-tabs')
export class AriaCarouselTabsElement extends BaseElement {
  protected aria: AriaCarouselTabsController = new AriaCarouselTabsController(this)

  @Query('q-aria-carousel-tab[active]')
  activeTabElement?: AriaCarouselTabElement

  @Closest('q-aria-carousel')
  rootElement!: AriaCarouselElement

  @QueryAll('q-aria-carousel-tab')
  tabElements!: AriaCarouselTabElement[]

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
      case KeyboardEventKey.ARROW_LEFT:
      case KeyboardEventKey.ARROW_RIGHT:
      case KeyboardEventKey.END:
      case KeyboardEventKey.HOME:
        event.preventDefault()
        event.stopPropagation()

        this.activeTabElement?.deactivate()
        this.rootElement.activeSlideElement?.deactivate()
    }

    switch (event.key) {
      case KeyboardEventKey.ARROW_LEFT:
        if (this.activeTabElementIndex <= 0) {
          this.tabElements[this.tabElements.length - 1].focus()

          this.tabElements[this.tabElements.length - 1].activate()
          ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_LEFT', `The last tab has been activated.`)

          this.rootElement.slideElements[this.tabElements.length - 1].activate()
          ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_LEFT', `The last slide has been activated.`)

          break
        }

        this.tabElements[this.activeTabElementIndex - 1].focus()

        this.tabElements[this.activeTabElementIndex - 1].activate()
        ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_LEFT', `The previous tab has been activated.`)

        this.rootElement.slideElements[this.activeTabElementIndex - 1].activate()
        ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_LEFT', `The previous slide has been activated.`)

        break
      case KeyboardEventKey.ARROW_RIGHT:
        if (this.activeTabElementIndex >= this.tabElements.length - 1) {
          this.tabElements[0].focus()

          this.tabElements[0].activate()
          ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_RIGHT', `The first tab has been activated.`)

          this.rootElement.slideElements[0].activate()
          ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_RIGHT', `The first slide has been activated.`)

          break
        }

        this.tabElements[this.activeTabElementIndex + 1].focus()

        this.tabElements[this.activeTabElementIndex + 1].activate()
        ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_RIGHT', `The next tab has been activated.`)

        this.rootElement.slideElements[this.activeTabElementIndex + 1].activate()
        ElementLogger.verbose(this.uid, 'onKeyDown', 'ARROW_RIGHT', `The next slide has been activated.`)

        break
      case KeyboardEventKey.END:
        this.tabElements[this.tabElements.length - 1].focus()

        this.tabElements[this.tabElements.length - 1].activate()
        ElementLogger.verbose(this.uid, 'onKeyDown', 'END', `The last tab has been activated.`)

        this.rootElement.slideElements[this.tabElements.length - 1].activate()
        ElementLogger.verbose(this.uid, 'onKeyDown', 'END', `The last slide has been activated.`)

        break
      case KeyboardEventKey.HOME:
        this.tabElements[0].focus()

        this.tabElements[0].activate()
        ElementLogger.verbose(this.uid, 'onKeyDown', 'HOME', `The first tab has been activated.`)

        this.rootElement.slideElements[0].activate()
        ElementLogger.verbose(this.uid, 'onKeyDown', 'HOME', `The first slide has been activated.`)

        break
    }
  }

  get activeTabElementIndex(): number {
    return this.activeTabElement ? this.tabElements.indexOf(this.activeTabElement) : -1
  }

  get name(): ElementName {
    return ElementName.CAROUSEL_TABS
  }
}

@CustomElement('q-aria-carousel-tab')
export class AriaCarouselTabElement extends BaseElement {
  protected aria: AriaCarouselTabController = new AriaCarouselTabController(this)

  @Property({ type: Boolean, reflect: true })
  active?: boolean

  @Closest('q-aria-carousel')
  rootElement!: AriaCarouselElement

  @Closest('q-aria-carousel-tabs')
  tabsElement!: AriaCarouselTabsElement

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('click', this.onClick)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('click', this.onClick)
  }

  onClick = (): void => {
    this.tabsElement.activeTabElement?.deactivate()
    this.rootElement.activeSlideElement?.deactivate()

    this.active = true
    ElementLogger.verbose(this.uid, 'onClick', `The tab has been activated.`)

    this.rootElement.slideElements[this.index].activate()
    ElementLogger.verbose(this.uid, 'onClick', `The matching slide has been activated.`)
  }

  activate(): void {
    this.active = true
  }

  deactivate(): void {
    this.active = false
  }

  get index(): number {
    return this.tabsElement.tabElements.indexOf(this)
  }

  get name(): ElementName {
    return ElementName.CAROUSEL_TAB
  }

  static styles = [
    super.styles,
    css`
      :host {
        cursor: pointer;
      }
    `
  ]
}
