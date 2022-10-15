interface Detail<T> {
  name: string
  old: T | null
  value: T | null
}

export class StateChangeEvent<T> extends CustomEvent<Detail<T>> {
  constructor(name: string, old: T | null, value: T | null) {
    super('state-change', { detail: { name, old, value } })
  }
}
