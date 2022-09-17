import { ID } from '@queelag/core'
import { ReactiveController, ReactiveControllerHost } from 'lit'
import { ELEMENT_UID_GENERATE_OPTIONS } from '../definitions/constants'
import { ElementName } from '../definitions/enums'
import type {
  AriaCarouselElement,
  AriaCarouselNextSlideControlElement,
  AriaCarouselPreviousSlideControlElement,
  AriaCarouselRotationControlElement,
  AriaCarouselSlideElement,
  AriaCarouselSlidesElement,
  AriaCarouselTabElement
} from '../elements/aria/aria.carousel.element'
import { setImmutableElementAttribute } from '../utils/element.utils'

export class AriaCarouselController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & AriaCarouselElement) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.setAttributes()
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  setAttributes(): void {
    setImmutableElementAttribute(this.host, 'aria-roledescription', 'carousel')
    // setImmutableElementAttribute(this.host, 'aria-label', '')
    setImmutableElementAttribute(this.host, 'role', 'region')

    setImmutableElementAttribute(this.host.slidesElement, 'aria-live', this.host.live ?? (this.host.automaticRotation ? 'off' : 'polite'))
  }
}

export class AriaCarouselNextSlideControlController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & AriaCarouselNextSlideControlElement) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.setAttributes()
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  setAttributes(): void {
    setImmutableElementAttribute(this.host, 'aria-label', 'Next Slide')
    setImmutableElementAttribute(this.host, 'aria-controls', this.host.rootElement.slidesElement.id)
    setImmutableElementAttribute(this.host, 'role', 'button')
    setImmutableElementAttribute(this.host, 'tabindex', '0')
  }
}

export class AriaCarouselPreviousSlideControlController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & AriaCarouselPreviousSlideControlElement) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.setAttributes()
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  setAttributes(): void {
    setImmutableElementAttribute(this.host, 'aria-label', 'Previous Slide')
    setImmutableElementAttribute(this.host, 'aria-controls', this.host.rootElement.slidesElement.id)
    setImmutableElementAttribute(this.host, 'role', 'button')
    setImmutableElementAttribute(this.host, 'tabindex', '0')
  }
}

export class AriaCarouselRotationControlController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & AriaCarouselRotationControlElement) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.setAttributes()
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  setAttributes(): void {
    setImmutableElementAttribute(this.host, 'aria-label', this.host.rootElement.live === 'polite' ? 'Start Automatic Slide Show' : 'Stop Automatic Slide Show')
    setImmutableElementAttribute(this.host, 'aria-controls', this.host.rootElement.slidesElement.id)
    setImmutableElementAttribute(this.host, 'role', 'button')
    setImmutableElementAttribute(this.host, 'tabindex', '0')
  }
}

export class AriaCarouselSlideController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & AriaCarouselSlideElement) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.setAttributes()
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  setAttributes(): void {
    setImmutableElementAttribute(this.host, 'aria-label', `${this.host.index + 1} of ${this.host.rootElement.slideElements.length}`)
    setImmutableElementAttribute(this.host, 'aria-roledescription', 'slide')
    setImmutableElementAttribute(this.host, 'role', this.host.rootElement.tabsElement ? 'tabpanel' : 'group')

    if (this.host.id.length <= 0) {
      setImmutableElementAttribute(this.host, 'id', ID.generate({ ...ELEMENT_UID_GENERATE_OPTIONS, prefix: ElementName.CAROUSEL_SLIDE }))
    }
  }
}

export class AriaCarouselSlidesController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & AriaCarouselSlidesElement) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.setAttributes()
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  setAttributes(): void {
    // setImmutableElementAttribute(this.host, 'aria-live', this.host.rootElement.live ?? (this.host.rootElement.automaticRotation ? 'off' : 'polite'))

    if (this.host.id.length <= 0) {
      setImmutableElementAttribute(this.host, 'id', ID.generate({ ...ELEMENT_UID_GENERATE_OPTIONS, prefix: ElementName.CAROUSEL_SLIDES }))
    }
  }
}

export class AriaCarouselTabController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & AriaCarouselTabElement) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.setAttributes()
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  setAttributes(): void {
    setImmutableElementAttribute(this.host, 'aria-controls', this.host.rootElement.slideElements[this.host.index].id)
    setImmutableElementAttribute(this.host, 'aria-label', `Slide ${this.host.index}`)
    setImmutableElementAttribute(
      this.host,
      'aria-selected',
      this.host.active && this.host.index === this.host.rootElement.activeSlideElementIndex ? 'true' : undefined
    )
    setImmutableElementAttribute(this.host, 'role', 'tab')
    setImmutableElementAttribute(this.host, 'tabindex', this.host.active ? '0' : '-1')
  }
}

export class AriaCarouselTabsController implements ReactiveController {
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
    setImmutableElementAttribute(this.host, 'aria-label', 'Slides')
    setImmutableElementAttribute(this.host, 'role', 'tablist')
  }
}