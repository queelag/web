import { IsomorphicEvent } from './isomorphic-event.js'

/**
 * @category Event
 */
export class ComboBoxExpandEvent extends IsomorphicEvent<void> {
  constructor() {
    super('combo-box-expand')
  }
}
