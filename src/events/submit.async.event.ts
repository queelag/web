interface Detail {
  finalize: Function
}

export class SubmitAsyncEvent extends CustomEvent<Detail> {
  constructor(finalize: Function) {
    super('submit-async', { detail: { finalize } })
  }
}
