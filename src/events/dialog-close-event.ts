import { IsomorphicEvent } from './isomorphic-event.js'

/**
 * @category Event
 */
export class DialogCloseEvent extends IsomorphicEvent<void> {
  constructor() {
    super('dialog-close')
  }
}
