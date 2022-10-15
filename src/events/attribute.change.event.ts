interface Detail {
  name: string
  old: string | null
  value: string | null
}

export class AttributeChangeEvent extends CustomEvent<Detail> {
  constructor(name: string, old: string | null, value: string | null) {
    super('attribute-change', { detail: { name, old, value } })
  }
}
