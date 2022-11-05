import { DEFAULT_SLIDER_THUMB_VALUE } from '../definitions/constants'
import { IsomorphicEvent } from './isomorphic.event'

interface Detail {
  percentage: number
  value: number
}

export class SliderThumbMoveEvent extends IsomorphicEvent<Detail> {
  constructor(value: number | undefined, percentage: number) {
    super('slider-thumb-move', { detail: { percentage, value: value ?? DEFAULT_SLIDER_THUMB_VALUE } })
  }
}
