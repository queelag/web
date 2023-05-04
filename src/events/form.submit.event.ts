import { IsomorphicEvent } from './isomorphic.event.js'

interface Detail {
  finalize: Function
}

export class FormSubmitEvent extends IsomorphicEvent<Detail> {
  constructor(finalize: Function) {
    super('form-submit', { detail: { finalize } })
  }
}
