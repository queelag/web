import { Interval } from '@queelag/core'
import { AriaCarouselController } from '../controllers/aria-carousel/aria.carousel.controller'
import { AriaCarouselNextSlideControlController } from '../controllers/aria-carousel/aria.carousel.next.slide.control.controller'
import { AriaCarouselPreviousSlideControlController } from '../controllers/aria-carousel/aria.carousel.previous.slide.control.controller'
import { AriaCarouselRotationControlController } from '../controllers/aria-carousel/aria.carousel.rotation.control.controller'
import { AriaCarouselSlideController } from '../controllers/aria-carousel/aria.carousel.slide.controller'
import { AriaCarouselSlidesController } from '../controllers/aria-carousel/aria.carousel.slides.controller'
import { Closest } from '../decorators/closest'
import { CustomElement } from '../decorators/custom.element'
import { Internal } from '../decorators/internal'
import { Property } from '../decorators/property'
import { Query } from '../decorators/query'
import { QueryAll } from '../decorators/query.all'
import { State } from '../decorators/state'
import { DEFAULT_CAROUSEL_ROTATION_DURATION } from '../definitions/constants'
import { ElementName, KeyboardEventKey } from '../definitions/enums'
import { AriaLive } from '../definitions/types'
import { ElementLogger } from '../loggers/element.logger'
import { BaseElement } from './base.element'

declare global {
  interface HTMLElementTagNameMap {
    'q-carousel': CarouselElement
    'q-carousel-next-slide-control': CarouselNextSlideControlElement
    'q-carousel-previous-slide-control': CarouselPreviousSlideControlElement
    'q-carousel-rotation-control': CarouselRotationControlElement
    'q-carousel-slide': CarouselSlideElement
    'q-carousel-slides': CarouselSlidesElement
  }
}

@CustomElement('q-carousel')
export class CarouselElement extends BaseElement {
  protected aria: AriaCarouselController = new AriaCarouselController(this)

  @Query('q-carousel-slide[active]')
  activeSlideElement?: CarouselSlideElement

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

  @QueryAll('q-carousel-slide')
  slideElements!: CarouselSlideElement[]

  @Query('q-carousel-slides')
  slidesElement!: CarouselSlidesElement

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

      this.slideElements[0].activate()
      ElementLogger.verbose(this.uid, 'activateNextSlide', `The first slide has been activated.`)

      return
    }

    this.activeSlideElement?.deactivate()

    this.slideElements[this.activeSlideElementIndex + 1].activate()
    ElementLogger.verbose(this.uid, 'activateNextSlide', `The next slide has been activated.`)
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

@CustomElement('q-carousel-slides')
export class CarouselSlidesElement extends BaseElement {
  protected aria: AriaCarouselSlidesController = new AriaCarouselSlidesController(this)

  @Closest('q-carousel')
  rootElement!: CarouselElement

  get name(): ElementName {
    return ElementName.CAROUSEL_SLIDES
  }
}

@CustomElement('q-carousel-slide')
export class CarouselSlideElement extends BaseElement {
  protected aria: AriaCarouselSlideController = new AriaCarouselSlideController(this)

  @Property({ type: Boolean, reflect: true })
  active?: boolean

  @Closest('q-carousel')
  rootElement!: CarouselElement

  @Closest('q-carousel-slides')
  slidesElement!: CarouselSlidesElement

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

@CustomElement('q-carousel-rotation-control')
export class CarouselRotationControlElement extends BaseElement {
  protected aria: AriaCarouselRotationControlController = new AriaCarouselRotationControlController(this)

  @Closest('q-carousel')
  rootElement!: CarouselElement

  connectedCallback(): void {
    super.connectedCallback()

    this.addEventListener('click', this.onClick)
    this.addEventListener('keydown', this.onKeyDown)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()

    this.removeEventListener('click', this.onClick)
    this.removeEventListener('keydown', this.onKeyDown)
  }

  onClick = (): void => {
    this.rootElement.forceAutomaticRotation = true

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

  onKeyDown = (event: KeyboardEvent): void => {
    if (event.key !== KeyboardEventKey.ENTER && event.key !== KeyboardEventKey.SPACE) {
      return
    }

    event.preventDefault()
    event.stopPropagation()

    this.click()
  }

  get name(): ElementName {
    return ElementName.CAROUSEL_ROTATION_CONTROL
  }
}

@CustomElement('q-carousel-next-slide-control')
export class CarouselNextSlideControlElement extends BaseElement {
  protected aria: AriaCarouselNextSlideControlController = new AriaCarouselNextSlideControlController(this)

  @Closest('q-carousel')
  rootElement!: CarouselElement

  connectedCallback(): void {
    super.connectedCallback()

    this.addEventListener('click', this.onClick)
    this.addEventListener('keydown', this.onKeyDown)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()

    this.removeEventListener('click', this.onClick)
    this.removeEventListener('keydown', this.onKeyDown)
  }

  onClick = (): void => {
    this.rootElement.activateNextSlide()
  }

  onKeyDown = (event: KeyboardEvent): void => {
    if (event.key !== KeyboardEventKey.ENTER && event.key !== KeyboardEventKey.SPACE) {
      return
    }

    event.preventDefault()
    event.stopPropagation()

    this.click()
  }

  get name(): ElementName {
    return ElementName.CAROUSEL_NEXT_SLIDE_CONTROL
  }
}

@CustomElement('q-carousel-previous-slide-control')
export class CarouselPreviousSlideControlElement extends BaseElement {
  protected aria: AriaCarouselPreviousSlideControlController = new AriaCarouselPreviousSlideControlController(this)

  @Closest('q-carousel')
  rootElement!: CarouselElement

  connectedCallback(): void {
    super.connectedCallback()

    this.addEventListener('click', this.onClick)
    this.addEventListener('keydown', this.onKeyDown)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()

    this.removeEventListener('click', this.onClick)
    this.removeEventListener('keydown', this.onKeyDown)
  }

  onClick = (): void => {
    this.rootElement.activatePreviousSlide()
  }

  onKeyDown = (event: KeyboardEvent): void => {
    if (event.key !== KeyboardEventKey.ENTER && event.key !== KeyboardEventKey.SPACE) {
      return
    }

    event.preventDefault()
    event.stopPropagation()

    this.click()
  }

  get name(): ElementName {
    return ElementName.CAROUSEL_PREVIOUS_SLIDE_CONTROL
  }
}
