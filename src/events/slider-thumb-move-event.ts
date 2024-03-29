import { DEFAULT_SLIDER_THUMB_VALUE } from '../definitions/constants.js'
import { IsomorphicEvent } from './isomorphic-event.js'

interface Detail {
  percentage: number
  value: number
}

/**
 * @category Event
 */
export class SliderThumbMoveEvent extends IsomorphicEvent<Detail> {
  constructor(value: number | undefined, percentage: number) {
    super('slider-thumb-move', { detail: { percentage, value: value ?? DEFAULT_SLIDER_THUMB_VALUE } })
  }
}
