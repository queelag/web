interface Detail {
  finalize: Function
}

export class ButtonClickEvent extends CustomEvent<Detail> {
  constructor(finalize: Function) {
    super('button-click', { detail: { finalize } })
  }
}
