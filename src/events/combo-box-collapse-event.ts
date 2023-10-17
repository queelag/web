import { IsomorphicEvent } from './isomorphic-event.js'

/**
 * @category Event
 */
export class ComboBoxCollapseEvent extends IsomorphicEvent<void> {
  constructor() {
    super('combo-box-collapse')
  }
}
