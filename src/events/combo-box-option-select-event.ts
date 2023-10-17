import { IsomorphicEvent } from './isomorphic-event.js'

interface Detail<T> {
  element: T
  label?: string
  value?: any
}

/**
 * @category Event
 */
export class ComboBoxOptionSelectEvent<T extends HTMLElement> extends IsomorphicEvent<Detail<T>> {
  constructor(element: T, label: string | undefined, value: any | undefined) {
    super('slider-change', { detail: { element, label, value } })
  }
}
