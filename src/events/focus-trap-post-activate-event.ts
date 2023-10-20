import { IsomorphicEvent } from './isomorphic-event.js'

/**
 * @category Event
 */
export class FocusTrapPostActivateEvent extends IsomorphicEvent<void> {
  constructor() {
    super('focus-trap-post-activate')
  }
}
