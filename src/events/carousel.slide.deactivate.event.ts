import type { AriaCarouselSlideElement } from '../elements/aria/aria.carousel.element'

interface Detail {
  element: AriaCarouselSlideElement
}

export class CarouselSlideDeactivateEvent extends CustomEvent<Detail> {
  constructor(element: AriaCarouselSlideElement) {
    super('carousel-slide-deactivate', { detail: { element } })
  }
}
