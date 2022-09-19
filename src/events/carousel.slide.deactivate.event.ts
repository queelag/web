interface Detail<T extends HTMLElement> {
  element: T
}

export class CarouselSlideDeactivateEvent<T extends HTMLElement> extends CustomEvent<Detail<T>> {
  constructor(element: T) {
    super('carousel-slide-deactivate', { detail: { element } })
  }
}
