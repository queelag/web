import { IsomorphicEvent } from './isomorphic-event.js'

interface Detail {
  percentage: number | number[]
  value?: number | number[]
}

/**
 * @category Event
 */
export class SliderChangeEvent extends IsomorphicEvent<Detail> {
  constructor(value: number | number[] | undefined, percentage: number | number[]) {
    super('slider-change', { detail: { percentage, value } })
  }
}
