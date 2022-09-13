interface Detail<T> {
  name: string
  old: T | null
  value: T | null
}

export class StateChangedEvent<T> extends CustomEvent<Detail<T>> {
  constructor(name: string, old: T | null, value: T | null) {
    super('state-changed', { detail: { name, old, value } })
  }
}
