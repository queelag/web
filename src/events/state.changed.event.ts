interface Detail {
  name: string
  old: string | null
  value: string | null
}

export class StateChangedEvent extends CustomEvent<Detail> {
  constructor(name: string, old: string | null, value: string | null) {
    super('statechanged', { detail: { name, old, value } })
  }
}
