interface Detail {
  finalize: Function
}

export class FormSubmitEvent extends CustomEvent<Detail> {
  constructor(finalize: Function) {
    super('form-submit', { detail: { finalize } })
  }
}
