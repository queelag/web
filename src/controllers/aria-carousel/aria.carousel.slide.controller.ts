import { ReactiveController, ReactiveControllerHost } from 'lit'
import type { CarouselSlideElement } from '../../elements/carousel.element'
import { setImmutableElementAttribute } from '../../utils/element.utils'

export class AriaCarouselSlideController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & CarouselSlideElement) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.setAttributes()
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  setAttributes(): void {
    setImmutableElementAttribute(this.host, 'aria-label', `${this.host.index + 1} of ${this.host.slidesElement.slideElements.length}`)
    setImmutableElementAttribute(this.host, 'aria-roledescription', 'slide')
    setImmutableElementAttribute(this.host, 'role', 'group')
  }
}
