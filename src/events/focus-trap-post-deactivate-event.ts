import { IsomorphicEvent } from './isomorphic-event.js'

/**
 * @category Event
 */
export class FocusTrapPostDeactivateEvent extends IsomorphicEvent<void> {
  constructor() {
    super('focus-trap-post-deactivate')
  }
}
