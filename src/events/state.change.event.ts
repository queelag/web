import { IsomorphicEvent } from './isomorphic.event'

interface Detail<T = unknown> {
  name: string
  old: T | null
  value: T | null
}

export class StateChangeEvent<T = unknown> extends IsomorphicEvent<Detail<T>> {
  constructor(name: string, old: T | null, value: T | null) {
    super('state-change', { detail: { name, old, value } })
  }
}
