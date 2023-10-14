import { IsomorphicEvent } from './isomorphic-event.js'

interface Detail<T = any> {
  name: string
  old?: T
  value?: T
}

/**
 * @category Event
 */
export class StateChangeEvent<T = any> extends IsomorphicEvent<Detail<T>> {
  constructor(name: string, old: T | undefined, value: T | undefined) {
    super('state-change', { detail: { name, old, value } })
  }
}
