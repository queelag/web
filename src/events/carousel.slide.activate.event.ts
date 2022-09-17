import type { AriaCarouselSlideElement } from '../elements/aria/aria.carousel.element'

interface Detail {
  element: AriaCarouselSlideElement
  old?: AriaCarouselSlideElement
}

export class CarouselSlideActivateEvent extends CustomEvent<Detail> {
  constructor(element: AriaCarouselSlideElement, old?: AriaCarouselSlideElement) {
    super('carousel-slide-activate', { detail: { element, old } })
  }
}
