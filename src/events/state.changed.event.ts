interface Detail<T> {
  name: string
  old: T | null
  value: T | null
}

export class StateChangedEvent<T> extends CustomEvent<Detail<T>> {
  constructor(name: string, old: T | null, value: T | null) {
    super('statechanged', { detail: { name, old, value } })
  }
}
