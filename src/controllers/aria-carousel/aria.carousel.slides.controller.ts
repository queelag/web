import { ReactiveController, ReactiveControllerHost } from 'lit'
import type { CarouselSlidesElement } from '../../elements/carousel.element'
import { setImmutableElementAttribute } from '../../utils/element.utils'

export class AriaCarouselSlidesController implements ReactiveController {
  constructor(private host: ReactiveControllerHost & CarouselSlidesElement) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.setAttributes()
  }

  hostUpdate(): void {
    this.setAttributes()
  }

  setAttributes(): void {
    setImmutableElementAttribute(this.host, 'aria-live', this.host.rootElement.live)
  }
}
