import { IsomorphicEvent } from './isomorphic-event.js'

interface Detail {
  finalize: Function
}

/**
 * @category Event
 */
export class ButtonClickEvent extends IsomorphicEvent<Detail> {
  constructor(finalize: Function) {
    super('button-click', { detail: { finalize } })
  }
}
