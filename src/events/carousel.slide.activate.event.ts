import { IsomorphicEvent } from './isomorphic.event'

interface Detail<T extends HTMLElement> {
  element: T
  old?: T
}

export class CarouselSlideActivateEvent<T extends HTMLElement> extends IsomorphicEvent<Detail<T>> {
  constructor(element: T, old?: T) {
    super('carousel-slide-activate', { detail: { element, old } })
  }
}
