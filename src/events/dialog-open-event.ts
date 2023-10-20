import { IsomorphicEvent } from './isomorphic-event.js'

/**
 * @category Event
 */
export class DialogOpenEvent extends IsomorphicEvent<void> {
  constructor() {
    super('dialog-open')
  }
}
