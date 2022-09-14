import { ReactiveController, ReactiveControllerHost } from 'lit'
import type { CarouselRotationControlElement } from '../../elements/carousel.element'
import { setImmutableElementAttribute } from '../../utils/element.utils'

export class AriaCarouselRotationControlController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & CarouselRotationControlElement) {
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
