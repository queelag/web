import { IsomorphicEvent } from './isomorphic.event.js'

interface Detail<T extends HTMLElement> {
  element: T
}

export class CarouselSlideDeactivateEvent<T extends HTMLElement> extends IsomorphicEvent<Detail<T>> {
  constructor(element: T) {
    super('carousel-slide-deactivate', { detail: { element } })
  }
}
