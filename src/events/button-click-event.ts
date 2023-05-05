import { IsomorphicEvent } from './isomorphic-event.js'

interface Detail {
  finalize: Function
}

export class ButtonClickEvent extends IsomorphicEvent<Detail> {
  constructor(finalize: Function) {
    super('button-click', { detail: { finalize } })
  }
}
