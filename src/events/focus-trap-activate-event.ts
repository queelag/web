import { IsomorphicEvent } from './isomorphic-event.js'

/**
 * @category Event
 */
export class FocusTrapActivateEvent extends IsomorphicEvent<void> {
  constructor() {
    super('focus-trap-activate')
  }
}
