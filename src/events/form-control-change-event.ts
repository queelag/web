import { IsomorphicEvent } from './isomorphic-event.js'

interface Detail<T> {
  value: T
}

/**
 * @category Event
 */
export class FormControlChangeEvent<T> extends IsomorphicEvent<Detail<T>> {
  constructor(value: T) {
    super('form-control', { detail: { value } })
  }
}
