interface Detail {
  name: string
  old: string | null
  value: string | null
}

export class AttributeChangedEvent extends CustomEvent<Detail> {
  constructor(name: string, old: string | null, value: string | null) {
    super('attributechanged', { detail: { name, old, value } })
  }
}
