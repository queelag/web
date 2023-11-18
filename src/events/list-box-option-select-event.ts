import { IsomorphicEvent } from './isomorphic-event.js'

interface Detail<T> {
  element: T
  label?: string
  value?: any
}

/**
 * @category Event
 */
export class ListBoxOptionSelectEvent<T extends HTMLElement> extends IsomorphicEvent<Detail<T>> {
  constructor(element: T, value: any) {
    super('list-box-option-select', { detail: { element, value } })
  }
}
