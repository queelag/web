import { IsomorphicEvent } from './isomorphic.event'

interface Detail {
  name: string
  old: string | null
  value: string | null
}

export class AttributeChangeEvent extends IsomorphicEvent<Detail> {
  constructor(name: string, old: string | null, value: string | null) {
    super('attribute-change', { detail: { name, old, value } })
  }
}
