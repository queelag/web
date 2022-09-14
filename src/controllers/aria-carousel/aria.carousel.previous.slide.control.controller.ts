import { ReactiveController, ReactiveControllerHost } from 'lit'
import type { CarouselPreviousSlideControlElement } from '../../elements/carousel.element'
import { setImmutableElementAttribute } from '../../utils/element.utils'

export class AriaCarouselPreviousSlideControlController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & CarouselPreviousSlideControlElement) {
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
