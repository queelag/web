import { IsomorphicEvent } from './isomorphic-event.js'

interface Detail<T extends HTMLElement> {
  element: T
  old?: T
}

/**
 * @category Event
 */
export class CarouselSlideActivateEvent<T extends HTMLElement> extends IsomorphicEvent<Detail<T>> {
  constructor(element: T, old?: T) {
    super('carousel-slide-activate', { detail: { element, old } })
  }
}
