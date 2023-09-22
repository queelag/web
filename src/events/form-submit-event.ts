import { IsomorphicEvent } from './isomorphic-event.js'

interface Detail {
  finalize: Function
}

/**
 * @category Event
 */
export class FormSubmitEvent extends IsomorphicEvent<Detail> {
  constructor(finalize: Function) {
    super('form-submit', { detail: { finalize } })
  }
}
