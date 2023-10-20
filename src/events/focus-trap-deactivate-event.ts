import { IsomorphicEvent } from './isomorphic-event.js'

/**
 * @category Event
 */
export class FocusTrapDeactivateEvent extends IsomorphicEvent<void> {
  constructor() {
    super('focus-trap-deactivate')
  }
}
