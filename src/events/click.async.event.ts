interface Detail {
  finalize: Function
}

export class ClickAsyncEvent extends CustomEvent<Detail> {
  constructor(finalize: Function) {
    super('clickasync', { detail: { finalize } })
  }
}
