interface Detail {
  name: string
  old: string | null
  value: string | null
}

export class AttributeChangedEvent extends CustomEvent<Detail> {
  constructor(name: string, old: string | null, value: string | null) {
    super('attribute-changed', { detail: { name, old, value } })
  }
}
