import { IsomorphicEvent } from './isomorphic.event'

interface Detail<T> {
  name: string
  old: T | null
  value: T | null
}

export class StateChangeEvent<T> extends IsomorphicEvent<Detail<T>> {
  constructor(name: string, old: T | null, value: T | null) {
    super('state-change', { detail: { name, old, value } })
  }
}
