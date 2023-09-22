import { IsomorphicEvent } from './isomorphic-event.js'

interface Detail {
  name: string
  old: string | null
  value: string | null
}

/**
 * @category Event
 */
export class AttributeChangeEvent extends IsomorphicEvent<Detail> {
  constructor(name: string, old: string | null, value: string | null) {
    super('attribute-change', { detail: { name, old, value } })
  }
}
