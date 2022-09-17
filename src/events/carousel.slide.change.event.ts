import type { AriaCarouselSlideElement } from '../elements/aria/aria.carousel.element'

interface Detail {
  element: AriaCarouselSlideElement
  index: number
}

export class CarouselSlideChangeEvent extends CustomEvent<Detail> {
  constructor(element: AriaCarouselSlideElement, index: number) {
    super('carousel-slide-change', { detail: { element, index } })
  }
}
